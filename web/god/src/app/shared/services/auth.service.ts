import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError, combineLatest, ObservableInput } from 'rxjs';
import { catchError, tap, switchMap, map, withLatestFrom } from 'rxjs/operators'

import { errorHandlerFactory } from './errorHandlerFactory.service'
import { Credentials } from '../models/Credentials';
import { Session } from '../models/Session';
import { SessionRepository } from '../services/session.repository';

import { environment } from '@env/environment';

@Injectable()
export class AuthService {

    ///////////////////////////////////////////////////////
    // Public
    ///////////////////////////////////////////////////////

    constructor(
        private httpClient: HttpClient,
        private sessionRepository: SessionRepository
    ) {}

    public isLoggedIn(): Boolean {
        return (this.sessionRepository.get() !== undefined);
    }

    public getToken(): string {
        if (!this.isLoggedIn()) {
            return '';
        }

        return this.sessionRepository
            .get()
            .getToken();
    }

    public logout(): void {
        this.sessionRepository.clear();
    }

    public login(credentials: Credentials): Observable<Session> | null {

        this.logout();
        const loginRequest = this.requestLogin(environment.login.url, credentials);

        return loginRequest.pipe(
            withLatestFrom(of(credentials)),
            map(
                ([apiResponse, credentials]) => {
                    return this.createAndPersistSession(credentials, apiResponse);
                }
            )
        );
    }

    ///////////////////////////////////////////////////////
    // Private
    ///////////////////////////////////////////////////////

    private requestLogin(url, credentials): Observable<any> {
        return this.httpClient.post<any>(url, credentials.toFormData());
    }

    private createAndPersistSession(credentials: Credentials, apiResponse:any): Session {

        const session = new Session(
            credentials.getUsername(),
            apiResponse.token
        );

        this.sessionRepository.set(session);

        return session;
    }
}