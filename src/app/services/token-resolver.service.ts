import {inject, Injectable} from '@angular/core';
import {Resolve, } from "@angular/router";
import {catchError, Observable, of, switchMap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenResolverService implements Resolve<any> {
  private readonly auth = inject(AuthService);

  constructor() { }

  resolve(): Observable<boolean>{
    const token = localStorage.getItem('token');
    if(token){
      return this.auth.verifyAndRefreshToken(token)
        .pipe(
          switchMap(jwtResponse => {
            this.auth.setLoginState(jwtResponse.token);
            return of(true);
          }),
          catchError(error => {
            this.auth.logout();
            return of(false);
          })
        )

    }
    return of(false);
  }
}
