import { Component, OnInit } from '@angular/core';
import { routerTransition } from '@app/router.animations';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
