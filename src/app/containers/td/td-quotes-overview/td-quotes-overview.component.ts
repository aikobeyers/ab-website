import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TdQuotesService } from '../../../services/td-quotes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TdQuoteCardComponent } from "./components/td-quote-card/td-quote-card.component";
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { Title } from '@angular/platform-browser';
import { FiltersStore } from '../../../stores/filters.store';
import { RouterLink } from "@angular/router";
import { TdQuoteFiltersComponent } from "../td-quote-filters/td-quote-filters.component";
import { take } from 'rxjs';
import { TdQuoteCreateComponent } from "../td-quote-create/td-quote-create.component";

@Component({
  selector: 'app-td-quotes-overview',
  providers: [Title],
  imports: [TdQuoteCardComponent, CommonModule, MatIcon, TdQuoteFiltersComponent, TdQuoteCreateComponent],
  templateUrl: './td-quotes-overview.component.html',
  styleUrl: './td-quotes-overview.component.scss'
})
export class TdQuotesOverviewComponent implements OnInit {
  @ViewChild('filters')
  private filtersComponent!: TdQuoteFiltersComponent;

  @ViewChild('create')
  private createComponent!: TdQuoteCreateComponent;



  private readonly tdQuotesService = inject(TdQuotesService);
  private readonly titleService = inject(Title);
  private readonly store = inject(FiltersStore);

  public quotes = this.store.quotes

  public isLoading = signal(false);

  public ngOnInit(): void {
    this.titleService.setTitle('TD Quotes');
    this.tdQuotesService.getAuthors()
    .pipe(take(1))
    .subscribe((authors) => {
      this.store.setAuthors(authors);
    });
    this.getQuotes();
  }

  public openFilters(): void {
    this.filtersComponent.openFilters();
  }

  public openCreate(): void {
    this.createComponent.openCreate();
  }

  public getQuotes(skip = false): void {    
    if (!skip) {
      this.isLoading.set(true);
      this.tdQuotesService.getTdQuotes().pipe(take(1)).subscribe((quotes) => {
        this.store.setQuotes(quotes);
        this.isLoading.set(false);
      });
    }
  }

  public createQuote(quoteData: {value: string, date: string, by: string | undefined | null, newAuthor: string| undefined | null}): void {
    this.tdQuotesService.createQuote(quoteData).pipe(take(1)).subscribe(() => {
      this.getQuotes();
    });
  }
}
