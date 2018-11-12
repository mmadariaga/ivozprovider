import {
    Component,
    OnInit,
    Input
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import Property from '@app/shared/models/Property';
import { ApiClientService } from '@shared/modules/entity/crud/services/ApiClient.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-boolean-element',
    template: `
        <div
            *ngIf="(collection$ | async) as collection"
            [formGroup]="form"
        >
            <select
                [formControlName]="property.name"
                name="{{ property.name }}"
                class="form-control"
            >
                <option
                    *ngFor="let candidate of collection.items"
                    [ngValue]="candidate.id"
                >
                    {{candidate.id}}
                </option>
            </select>
        </div>
    `
})
export class EntityElementComponent implements OnInit {

    @Input() property: Property;
    @Input() form: FormGroup;

    collection$: Observable<Object>;

    constructor(
        private apiClientService: ApiClientService,
    ) {}

    public ngOnInit() {

        const endpoint = this.apiClientService
            .getEntityBasePath(this.property.type)
            .slice(1);

        /**
         * @todo not paginated results required
         */
        this.collection$ = this.apiClientService
            .getCollection(endpoint, -1);
    }
}
