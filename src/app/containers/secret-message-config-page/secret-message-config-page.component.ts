import {Component, inject, model, OnInit, signal} from '@angular/core';
import {SecretMessageApiService} from "../../services/secret-message-api.service";
import {filter, take, tap} from "rxjs";
import {QuoteWithId} from "../../models/Quote";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../../components/dialog/dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-secret-message-config-page',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatIcon,
    MatCheckbox,
    MatInput,
    MatIconButton,
    MatFormField,
    FormsModule,
    MatButton,
    MatLabel,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './secret-message-config-page.component.html',
  styleUrl: './secret-message-config-page.component.scss',
  standalone: true
})
export class SecretMessageConfigPageComponent implements OnInit {
  readonly columns = ['quote', 'display', 'controls'];
  quotes = signal<QuoteWithId[]>([]);
  rowToUpdate = signal<string>('');
  showNewRow = signal(false);

  newQuote = model('');
  newQuoteDisplay = model(false);

  dialogRef: MatDialogRef<DialogComponent> | undefined;

  readonly dialog = inject(MatDialog);
  private readonly api = inject(SecretMessageApiService);

  constructor() {
    //TODO figure out why this is not triggered when closing the dialog
    this.dialog.afterAllClosed
      .pipe(
        filter(() => {
          return this.dialogRef?.componentInstance.quote() !== undefined && this.dialogRef?.componentInstance.display() !== undefined
        }),
        tap(() => {
          if (this.dialogRef?.componentInstance.quote() && this.dialogRef?.componentInstance.display()) {
            console.log(this.dialogRef?.componentInstance.quote(), this.dialogRef?.componentInstance.display())
            this.api.newQuote({
              quote: this.dialogRef?.componentInstance.quote(),
              display: this.dialogRef?.componentInstance.display()
            })
              .pipe(
                tap(newQuote => {
                  this.quotes.set([...this.quotes(), newQuote]);
                }),
                take(1)
              )
              .subscribe();
          }
          this.showNewRow.set(false);
        }),
        takeUntilDestroyed()
      ).subscribe();
  }

  ngOnInit(): void {
    this.getAllQuotes();
  }

  getAllQuotes() {
    this.api.getAllQuotes()
      .pipe(
        tap(quotes => this.quotes.set(quotes)),
        take(1)
      )
      .subscribe();
  }

  updateQuote(id: string) {
    const quoteToUpdate = this.quotes().find(quote => quote._id === id);

    this.rowToUpdate.set('');
    if (quoteToUpdate) {
      this.api.updateQuote(quoteToUpdate).subscribe();
    }
  }

  updateDisplayValue(currentQuote: QuoteWithId, newValue: any) {
    const quoteToUpdate = this.quotes().find(quote => quote._id === currentQuote._id);

    if (quoteToUpdate) {
      quoteToUpdate.display = newValue;
    }
    if (this.rowToUpdate() !== quoteToUpdate?._id) {
      if (quoteToUpdate) {
        this.api.updateQuote(quoteToUpdate).subscribe()
      }
    }
  }

  deleteQuote(id: string) {
    this.api.deleteQuote(id)
      .pipe(
        tap(() => {
          this.getAllQuotes();
        })
      )
      .subscribe();
  }

  setQuoteInUpdateState(id: string) {
    this.rowToUpdate.set(id)
  }

  openDialog() {
    this.showNewRow.set(true);
    /*this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });*/
  }

  addQuote(){
    this.api.newQuote({
      quote: this.newQuote(),
      display: this.newQuoteDisplay()
    })
      .pipe(
        tap(newQuote => {
          this.quotes.set([...this.quotes(), newQuote]);
          this.showNewRow.set(false);
        }),
        take(1)
      )
      .subscribe();
  }
}
