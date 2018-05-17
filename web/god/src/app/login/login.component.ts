import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, catchError} from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs';

import { routerTransition } from '../router.animations';
import { AuthService } from '@shared/services/auth.service';
import { Credentials } from '@shared/models/Credentials';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    loginError: Boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {
        this.authService = authService;
        this.createForm();
    }

    ngOnInit() {}

    createForm() {
        this.form = this.formBuilder.group({
            'username': [
                'admin',
                Validators.required
            ],
            'password': [
                'changeme',
                Validators.compose([Validators.required])
            ]
        });
    }

    public login(formValues) {

        this.loginError = false;
        const credentials = new Credentials(
            formValues.username,
            formValues.password
        );

        this.authService
            .login(credentials)
            .subscribe(
                (success) => this.router.navigate(['/dashboard']),
                (error) => this.loginError = true
            );
    }
}
