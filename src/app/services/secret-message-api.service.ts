import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Quote, QuoteWithId} from "../models/Quote";
import {Observable, take} from "rxjs";

import { environment } from '../../environments/environment';

const BASE_URL: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SecretMessageApiService {

  private readonly http = inject(HttpClient)

  constructor() {
  }

  newQuote(newQuote: Quote):Observable<QuoteWithId>{
    return this.http.post<QuoteWithId>(BASE_URL, newQuote);
  }

  getAllQuotes(): Observable<QuoteWithId[]> {
    return this.http.get<QuoteWithId[]>(BASE_URL);
  }

  getSingleQuote(id: string): Observable<QuoteWithId> {
    return this.http.get<QuoteWithId>(`${BASE_URL}/${id}`);
  }

  deleteQuote(id: string) {
    return this.http.delete<void>(`${BASE_URL}/${id}`).pipe(take(1));
  }

  updateQuote(updatedQuote: QuoteWithId): Observable<QuoteWithId> {
    return this.http.put<QuoteWithId>(`${BASE_URL}/${updatedQuote._id}`, updatedQuote).pipe(take(1))
  }
}
