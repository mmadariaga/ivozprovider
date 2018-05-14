import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { routerTransition } from '../router.animations';
import { AuthService } from './service/auth.service';
import { Credentials } from './model/credentials';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    form: FormGroup;

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

        const credentials = new Credentials(
            formValues.username,
            formValues.password
        );

        this.authService
            .login(credentials)
            .subscribe(_ => console.log('success', _));
        //localStorage.setItem('isLoggedin', 'true');
    }
}
