import { Injectable } from '@angular/core';

import { Session } from '../models/session';

@Injectable()
export class SessionRepository {

    private session: Session | null;

    constructor() {
        if (sessionStorage.token) {
            this.session = new Session(
                sessionStorage.username,
                sessionStorage.token
            );
        }
    }

    get(): Session | null  {
        return this.session;
    }

    set(session: Session) {
        this.session = session;
        sessionStorage.setItem('username', session.getUsername());
        sessionStorage.setItem('token', session.getToken());
    }

    clear(): void  {
        this.session = null;
        sessionStorage.clear();
    }
}