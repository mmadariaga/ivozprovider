import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import Property from '@app/shared/models/Property';

@Component({
    selector: 'app-boolean-element',
    template: `
        <div [formGroup]="form">
            <select
                [formControlName]="property.name"
                name="{{ property.name }}"
                class="form-control"
            >
                <option [value]="false">No</option>
                <option [value]="true">Yes</option>
            </select>
        </div>
    `
})
export class BooleanElementComponent implements OnInit {

    @Input() property: Property;
    @Input() form: FormGroup;

    constructor() {}

    public ngOnInit() {}
}
