import { Component, inject, OnInit, signal } from '@angular/core';
import { TdQuotesService } from '../../../services/td-quotes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TdQuoteCardComponent } from "./components/td-quote-card/td-quote-card.component";
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { Title } from '@angular/platform-browser';
import { FiltersStore } from '../../../stores/filters.store';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-td-quotes-overview',
  providers: [Title],
  imports: [TdQuoteCardComponent, CommonModule, MatIcon, RouterLink],
  templateUrl: './td-quotes-overview.component.html',
  styleUrl: './td-quotes-overview.component.scss'
})
export class TdQuotesOverviewComponent implements OnInit {
  private readonly tdQuotesService = inject(TdQuotesService);
  private readonly titleService = inject(Title);
  private readonly store = inject(FiltersStore);

  public quotes = toSignal(
    this.tdQuotesService.getTdQuotes(), { initialValue: [] }
  );

  public ngOnInit(): void {
    this.titleService.setTitle('TD Quotes');
    this.tdQuotesService.getAuthors().subscribe((authors) => {
      this.store.setAuthors(authors);
    });

  }
}
