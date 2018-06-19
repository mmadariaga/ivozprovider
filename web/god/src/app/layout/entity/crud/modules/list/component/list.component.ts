import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { routerTransition } from '@app/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import ApiClientService from '@crud/services/ApiClient.service';
import Collection from '@crud/models/Collection';

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
                    <div *ngIf="collection$ | async as collection">
                        Total Items: {{ collection.totalItems }}

                        <table
                            class="card-body table table-hover">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th *ngFor="let property of collection.properties">{{ property.name }} </th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let item of collection.items">
                                    <td>
                                        <a [routerLink]="[editBaseLink + item.id]">{{ item.id }}</a>
                                    </td>
                                    <td *ngFor="let property of collection.properties">
                                        {{ item[property.name] }}
                                    </td>
                                    <td>
                                        <button
                                            class="btn btn-secondary"
                                            [routerLink]="[editBaseLink + item.id]"
                                            >[X] Edit
                                        </button>
                                        &nbsp;
                                        <button
                                            class="btn btn-secondary"
                                            (click)="delete(item)"
                                            >[-] Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button
                            class="btn btn-secondary"
                            [routerLink]="[newBaseLink]"
                            > [+] Add
                        </button>

                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {

    entityName: string = '';
    newBaseLink: string;
    editBaseLink: string;
    collection$: Observable<Collection>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private apiClientService: ApiClientService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.init();
        });
    }

    public delete(item) {

        this.apiClientService
            .remove(this.entityName, item.id).subscribe(
                (success) => { console.log('success')},
                (error) => { console.log('error')},
            );
    }

    private init() {
        this.entityName = this.route.snapshot.paramMap.get('entity').replace('-', '_');
        this.newBaseLink = this.router.url + '/new/';
        this.editBaseLink = this.router.url + '/edit/';

        this.collection$ =  this.apiClientService.getCollection(
            this.entityName
        );
    }
}
