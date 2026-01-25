import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TdQuoteWithId } from '../models/TdQuote';

const BASE_URL: string = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class TdQuotesService {

  constructor(private readonly http: HttpClient) { }

  public getAllTdQuotes() {
    return this.http.get<TdQuoteWithId[]>(`${BASE_URL}/tdquotes/all`);
  }
}
