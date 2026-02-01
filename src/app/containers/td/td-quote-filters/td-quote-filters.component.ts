import { Component, effect, inject } from '@angular/core';
import { FiltersStore } from '../../../stores/filters.store';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-td-quote-filters',
  imports: [RouterLink],
  templateUrl: './td-quote-filters.component.html',
  styleUrl: './td-quote-filters.component.scss',
})
export class TdQuoteFiltersComponent {
  private readonly store = inject(FiltersStore);

  public authors = this.store.authors;

  toggleAuthor(author: string): void {    
    this.store.toggleAuthor(author);    
  }

  isSelected(author: string): boolean {
    return this.store.filterBy().includes(author);
  }

  resetFilters(): void {
    this.store.resetFilters();
  }
}
 