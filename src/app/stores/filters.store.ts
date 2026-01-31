import { Injectable } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export type FiltersState = {
  by: string;
  quoteQuery: string;
};

const initialFiltersState: FiltersState = {
  by: 'AIko',
  quoteQuery: 'test',
};

export const FiltersStore = signalStore(
  { providedIn: 'root' },
  withState({ filters: initialFiltersState }),
  withMethods((store) => ({
    setFilterBy(by: string): void {
      patchState(store, { filters: { ...store.filters(), by } });
    },
    setQuoteQuery(quoteQuery: string): void {
      patchState(store, { filters: { ...store.filters(), quoteQuery } });
    },
    setFilters(filters: Partial<FiltersState>): void {
      patchState(store, { filters: { ...store.filters(), ...filters } });
    },
    resetFilters(): void {
      patchState(store, { filters: { by: '', quoteQuery: '' } });
    },
    getFilterBy(): string {
      return store.filters().by;
    },
  }))
);
