import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, last } from 'rxjs/operators'

import { errorHandlerFactory } from './errorHandlerFactory.service'
import { Credentials } from '../model/credentials';

// import { of } from 'rxjs/observable/of';
// import { _throw } from 'rxjs/observable/throw';
// import { switchMap, catchError, tap, last } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
// 
// 
// import { User, Authenticate, Session } from '../models/user';
import { environment } from '@env/environment';

console.log('environment', environment);

@Injectable()
export class AuthService {

    constructor(
        private httpClient: HttpClient
    ) {}

    login(credentials: Credentials): Observable<any> {
        return this.httpClient
            .post<any>(environment.login.url, credentials.toFormData())
            //.subscribe(_ => console.log(_));
            .pipe(
                tap(response => console.log(`response`, response)),
                catchError(errorHandlerFactory<Boolean>('login', false))
            );

    }
}