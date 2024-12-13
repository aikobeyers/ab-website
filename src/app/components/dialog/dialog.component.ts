import {Component, Inject, inject, model, OnInit, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {AuthService} from "../../services/auth.service";
import {catchError, take, tap, throwError} from "rxjs";

@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly auth = inject(AuthService);

  timeRemaining = signal(15);

  constructor() {}

  private interval?: any;

  ngOnInit() {
    this.interval = setInterval(()=>{
      if(this.timeRemaining() > 0) {
        this.timeRemaining.set(this.timeRemaining() -1 );
      } else {
        clearInterval(this.interval);
        this.dialogRef.close();
        this.logout();
      }
    }, 1000)
  }

  refresh(){
    this.auth.verifyAndRefreshToken(this.auth.token())
      .pipe(
        take(1),
        tap(res => {
          this.auth.setLoginState(res.token);
          clearInterval(this.interval);
        }),
        catchError((e) => {
          this.logout();
          return throwError(() => e);
        })

      )
      .subscribe();
  }

  logout(){
    if(this.interval){
      clearInterval(this.interval);
    }
    this.auth.logout();
  }
}
