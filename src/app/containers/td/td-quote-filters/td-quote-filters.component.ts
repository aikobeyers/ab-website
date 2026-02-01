import { Component, inject, output, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FiltersStore } from '../../../stores/filters.store';
import { NgClass } from '@angular/common';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-td-quote-filters',
  imports: [NgClass, MatIcon],
  templateUrl: './td-quote-filters.component.html',
  styleUrl: './td-quote-filters.component.scss',
})
export class TdQuoteFiltersComponent implements OnDestroy {
  private readonly store = inject(FiltersStore);
  private readonly document = inject(DOCUMENT);

  public authors = this.store.authors;

  public isOpen = false;

  public closeFiltersEmitter = output<void>();

  toggleAuthor(author: string): void {    
    this.store.toggleAuthor(author);    
  }

  isSelected(author: string): boolean {
    return this.store.filterBy().includes(author);
  }

  resetFilters(): void {
    this.store.resetFilters();
  }

  toggleSelf(): void {
    this.setOpen(!this.isOpen);
  }

  closeFilters (): void {
    this.setOpen(false);
    this.closeFiltersEmitter.emit();
  }

  openFilters(): void {
    this.setOpen(true);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('filters--open');
  }

  private setOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
    this.document.body.classList.toggle('filters--open', isOpen);
  }
}
 