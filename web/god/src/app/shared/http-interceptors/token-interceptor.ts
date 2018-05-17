import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthService } from '@shared/services/auth.service'
import { HttpResponse } from 'selenium-webdriver/http';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private loginUrl = '';

  ///////////////////////////////////////////////////////////////
  // Public
  ///////////////////////////////////////////////////////////////
  constructor(private authService: AuthService, private router: Router) {
    this.loginUrl = environment.login.url;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = this.addAuthorizationHeader(req);

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleUnauthorized(err);
        return of(null);
      })
    );
  }

  ///////////////////////////////////////////////////////////////
  // Private 
  ///////////////////////////////////////////////////////////////
  private addAuthorizationHeader(req: HttpRequest<any>) {
    if (!this.authService.isLoggedIn()) {
      return req;
    }

    if (req.url === this.loginUrl) {
      return req;
    }

    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authService.getToken()}`),
      body: {
          ...req.body
      }
    });
  }

  private handleUnauthorized(err: HttpErrorResponse) {
    const unauthorized = (
      err instanceof HttpErrorResponse
      && err.status === 401
    );

    if (unauthorized) {
      // @todo show modal window
      console.warn('Unauthorized');
      this.router.navigate(['/login', {}]);
    }
  }
}