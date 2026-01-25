import { Component, OnInit, signal } from '@angular/core';
import { TdQuotesService } from '../../../services/td-quotes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-td-quotes-overview',
  imports: [JsonPipe],
  templateUrl: './td-quotes-overview.component.html',
  styleUrl: './td-quotes-overview.component.scss'
})
export class TdQuotesOverviewComponent implements OnInit {

  public quotes: any;

  public constructor(private readonly tdQuotesService: TdQuotesService) {
    this.quotes = toSignal(this.tdQuotesService.getAllTdQuotes());
  }

  public ngOnInit(): void {
    console.log('test');
    
  }
}
