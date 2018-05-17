import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

import { errorHandlerFactory } from './errorHandlerFactory.service'
import { Credentials } from '../models/credentials';
import { Session } from '../models/session';
import { SessionRepository } from '../services/session.repository';

import { environment } from '@env/environment';

@Injectable()
export class AuthService {

    constructor(
        private httpClient: HttpClient,
        private sessionRepository: SessionRepository
    ) {}

    public isLoggedIn(): Boolean {
        return (this.sessionRepository.get() !== null);
    }

    public logout(): void {
        this.sessionRepository.clear();
    }

    public login(credentials: Credentials): Observable<Session> | null {

        this.logout();

        return this.httpClient
            .post<any>(environment.login.url, credentials.toFormData())
            .pipe(
                tap(
                    (response): Observable<Session> => {
                        const session = new Session(credentials.getUsername(), response.token);
                        this.sessionRepository.set(session);
                        return of(session);
                    }
                ),
                catchError( () => throwError(new Error('Login error')) )
            );
    }
}