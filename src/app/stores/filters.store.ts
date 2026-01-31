import { Injectable } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

export type FiltersState = {
    by: string[];
    quoteQuery: string;
    authors: string[];
};

const initialFiltersState: FiltersState = {
    by: [],
    quoteQuery: '',
    authors: [],
};

export const FiltersStore = signalStore(
  { providedIn: 'root' },
  withState({ filters: initialFiltersState }),
  withMethods((store) => ({
    setFilterBy(by: string[]): void {
      patchState(store, { filters: { ...store.filters(), by } });
    },
    setQuoteQuery(quoteQuery: string): void {
      patchState(store, { filters: { ...store.filters(), quoteQuery } });
    },
    setFilters(filters: Partial<FiltersState>): void {
      patchState(store, { filters: { ...store.filters(), ...filters } });
    },
    setAuthors(authors: string[]): void {
      patchState(store, { filters: { ...store.filters(), authors } });
    },
    resetFilters(): void {
      patchState(store, { filters: { by: [], quoteQuery: '', authors: [] } });
    },
    addAuthor(author: string): void {
        console.log('Adding author:', author);
      const currentAuthors = store.filters().by;
      if (!currentAuthors.includes(author)) {
        patchState(store, { filters: { ...store.filters(), by: [...currentAuthors, author] } });
      }
    },
    removeAuthor(author: string): void {
      const currentAuthors = store.filters().by;
      patchState(store, { filters: { ...store.filters(), by: currentAuthors.filter(a => a !== author) } });
    },
  })),
  withComputed((store) => ({
    filterBy: computed(() => store.filters().by),
    quoteQuery: computed(() => store.filters().quoteQuery),
    authors: computed(() => store.filters().authors),
  }))
);
