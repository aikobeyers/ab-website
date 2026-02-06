import { Component, inject, output, OnDestroy, signal } from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TdQuotesService } from '../../../services/td-quotes.service';
import { take } from 'rxjs';
import { SkeletonComponent } from "../../../components/skeleton/skeleton.component";
import { TdQuoteWithId } from '../../../models/TdQuote';

@Component({
  selector: 'app-td-quote-game',
  imports: [NgClass, MatIcon, SkeletonComponent],
  templateUrl: './td-quote-game.component.html',
  styleUrl: './td-quote-game.component.scss',
})
export class TdQuoteGameComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly tdQuotesService = inject(TdQuotesService);

  public isOpen = false;
  public isLoading = signal(false);

  public randomQuote = signal<TdQuoteWithId | null>(null);

  public closeGameEmitter = output<void>();

  openGame(): void {
    this.isLoading.set(true);
    this.setOpen(true);

    this.tdQuotesService.getRandomQuote()
      .pipe(take(1))
      .subscribe((quote) => {
        this.isLoading.set(false);
        this.randomQuote.set(quote);
      });
  }

  closeGame(): void {
    this.setOpen(false);
    this.closeGameEmitter.emit();
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('game--open');
  }

  private setOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
    this.document.body.classList.toggle('game--open', isOpen);
  }
}
