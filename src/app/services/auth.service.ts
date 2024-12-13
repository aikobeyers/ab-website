import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable, take} from "rxjs";
import {JwtResponse} from "../models/JwtResponse";

const AUTH_URL: string = environment.authUrl;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal(false);
  token = signal<string>('')
  private readonly http = inject(HttpClient);

  constructor() {
  }

  register() {

  }

  login(credentials: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${AUTH_URL}/login`, credentials)
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set('');
    this.isLoggedIn.set(false);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  checkTokenForValidity() {

  }

  verifyAndRefreshToken(token: string) {
    return this.http.post<JwtResponse>(`${AUTH_URL}/verify`, {token}, {headers: {'Authorization': token}})
  }

  setLoginState(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
    this.token.set(token);
  }
}
