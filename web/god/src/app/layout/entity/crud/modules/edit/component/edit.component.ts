import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { routerTransition } from '@app/router.animations';
import { FormFactoryService } from '@shared/services/FormFactory.service';
import ApiClientService from '@crud/services/ApiClient.service';
import Item from '@crud/models/Item';
import { last, tap } from 'rxjs/operators';

@Component({
    selector: 'app-form-list',
    template: `
        <div [@routerTransition]>
            <app-page-header [heading]="entityName" [icon]="'fa-table'"></app-page-header>
            <div class="col col-xl-12 col-lg-12">
                <div class="card mb-3">
                    <div class="card-header">
                        {{ entityName }}
                    </div>
                    <div *ngIf="form && (item$ | async) as item">
                        <form [formGroup]="form" (ngSubmit)="submit(form.value)">
                            <table class="card-body table table-hover">
                                <tbody>
                                    <tr *ngFor="let property of item.getProperties()">
                                        <td>
                                            {{ property.name }}
                                        </td>
                                        <td>
                                            <app-form-element
                                                [property]="property"
                                                [item]="item"
                                                [form]="form"
                                            ></app-form-element>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div *ngIf="success" class="alert alert-success">
                                <strong>Well done!</strong> You successfully read this important alert message.
                            </div>
                            <div *ngIf="error" class="alert alert-danger">
                                <strong>Oh snap!</strong> Change a few things up and try submitting again.
                            </div>
                            <input
                                class=""
                                type="submit"
                                class="btn rounded-btn button expanded"
                                value="Save"
                                [disabled]="!form.valid"
                            >
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [routerTransition()]
})
export class EditComponent implements OnInit {

    form: FormGroup = null;

    entityName: string = '';
    routeLinkTemplate: string;
    item$: Observable<Item>;
    item: Item;
    success: boolean = false;
    error: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private apiClientService: ApiClientService,
        private formFactoryService: FormFactoryService
    ) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.init();
        });
    }

    public submit(formData: Object) {

        this.success = false;
        this.error = false;

        this.update(formData).subscribe(
            (success) => {
                console.log('success');
                this.success = true;
            },
            (error) => {
                console.log('error');
                this.error = true;
            },
        );
    }

    private init() {

        let id = this.route.snapshot.paramMap.get('id');

        this.entityName = this.route.snapshot.paramMap.get('entity').replace('-', '_');
        this.routeLinkTemplate = this.router.url + '/';
        this.item$ = this.apiClientService.get(this.entityName, id);

        this.item$.subscribe((result: Item) => {

            this.item = result;

            this.form = this.formFactoryService.fromProperties(
                result.getProperties()
            );

            const entityAttributes = this.flattenAttributes(
                result.getEntity().getAttributes()
            );

            const initialValues = {
                ...this.form.value,
                ...entityAttributes
            };

            this.form.patchValue(initialValues);
        });
    }

    private flattenAttributes(values: Object): Object{

        let response =  {};
        for (let idx in values) {

            const value = values[idx];
            const isObject = (Object.prototype.toString.call(value) === '[object Object]');

            if (isObject && value.id) {
                response[idx] = value.id;
                continue;
            } else if (isObject) {
                /**
                 * @todo
                 */
                console.log(`Skipping ${idx}`);
                continue;
            }

            response[idx] = value;
        }

        return response;
    }

    private update(formData: Object): Observable<Object> {

        const model = this.mapToModel(formData);
        console.log('model >', model);

        return this.apiClientService.update(
            this.entityName,
            this.item.getEntity().get('id'),
            model
        );
    }

    private mapToModel(formData: Object): any {

        let response =  {};
        const spec = this.item.getSpec();
        const requestModel = spec['item']['put'].parameters[1].schema.$ref;

        for (let property in requestModel.properties) {

            if (!formData[property]) {
                continue;
            }

            response[property] = formData[property];
        }

        return response;
    }
}
