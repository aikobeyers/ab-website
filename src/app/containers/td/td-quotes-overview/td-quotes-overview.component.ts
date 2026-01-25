import { Component, OnInit } from '@angular/core';
import { TdQuotesService } from '../../../services/td-quotes.service';

@Component({
  selector: 'app-td-quotes-overview',
  imports: [],
  templateUrl: './td-quotes-overview.component.html',
  styleUrl: './td-quotes-overview.component.scss'
})
export class TdQuotesOverviewComponent implements OnInit {


  public constructor(private readonly tdQuotesService: TdQuotesService) { }

  public ngOnInit(): void {
    this.tdQuotesService.getAllTdQuotes().subscribe((quotes) => {
      console.log(quotes);
    });
  }
}
