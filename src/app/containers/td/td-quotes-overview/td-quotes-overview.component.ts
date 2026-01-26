import { Component, inject, OnInit, signal } from '@angular/core';
import { TdQuotesService } from '../../../services/td-quotes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TdQuoteCardComponent } from "./components/td-quote-card/td-quote-card.component";
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-td-quotes-overview',
  imports: [TdQuoteCardComponent, CommonModule, MatIcon],
  templateUrl: './td-quotes-overview.component.html',
  styleUrl: './td-quotes-overview.component.scss'
})
export class TdQuotesOverviewComponent implements OnInit {
  private readonly tdQuotesService = inject(TdQuotesService);

  public quotes = toSignal(
    this.tdQuotesService.getAllTdQuotes(), { initialValue: [] }
  );

  public ngOnInit(): void {
    console.log('Hqllo');
  
  }
}
