import { Component, effect, input } from '@angular/core';
import { TdQuoteWithId } from '../../../../../models/TdQuote';

@Component({
  selector: 'td-quote-card',
  imports: [],
  templateUrl: './td-quote-card.component.html',
  styleUrl: './td-quote-card.component.scss'
})
export class TdQuoteCardComponent {
  public tdQuote = input<TdQuoteWithId>();

  constructor() {
  }

}
