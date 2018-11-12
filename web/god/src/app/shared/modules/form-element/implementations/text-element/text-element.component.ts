import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import Property from '@app/shared/models/Property';

@Component({
    selector: 'app-text-element',
    template: `
        <div [formGroup]="form">
            <input
                [formControlName]="property.name"
                name="{{ property.name }}"
                type="text"
                class="form-control input-underline input-lg"
                placeholder="{{ property.name }}" />
        </div>
    `
})
export class TextElementComponent implements OnInit {

    @Input() property: Property;
    @Input() form: FormGroup;

    constructor() {}

    public ngOnInit() {}
}
