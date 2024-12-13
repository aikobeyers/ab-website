import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Quote, QuoteWithId} from "../models/Quote";
import {Observable, take} from "rxjs";

import { environment } from '../../environments/environment';
import {AuthService} from "./auth.service";

const BASE_URL: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SecretMessageApiService {

  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  constructor() {
  }

  newQuote(newQuote: Quote):Observable<QuoteWithId>{
    return this.http.post<QuoteWithId>(BASE_URL, newQuote, { headers: {'Authorization': this.auth.token() ?? ''}});
  }

  getAllQuotes(): Observable<QuoteWithId[]> {
    return this.http.get<QuoteWithId[]>(BASE_URL, { headers: {'Authorization': this.auth.token() ?? ''}});
  }

  getRandomQuote(): Observable<QuoteWithId> {
    return this.http.get<QuoteWithId>(`${BASE_URL}/random`).pipe(take(1));
  }

  getSingleQuote(id: string): Observable<QuoteWithId> {
    return this.http.get<QuoteWithId>(`${BASE_URL}/${id}`);
  }

  deleteQuote(id: string) {
    return this.http.delete<void>(`${BASE_URL}/${id}`, { headers: {'Authorization': this.auth.token() ?? ''}}).pipe(take(1));
  }

  updateQuote(updatedQuote: QuoteWithId): Observable<QuoteWithId> {
    return this.http.put<QuoteWithId>(`${BASE_URL}/${updatedQuote._id}`, updatedQuote, { headers: {'Authorization': this.auth.token() ?? ''}}).pipe(take(1))
  }
}
