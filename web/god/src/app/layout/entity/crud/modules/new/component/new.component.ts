import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { routerTransition } from '@app/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import ApiClientService from '@crud/services/ApiClient.service';
import Collection from '@crud/models/Collection';

@Component({
    selector: 'app-form-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {

    entityName: string = '';
    routeLinkTemplate: string;
    collection$: Observable<Collection>;
    private entityModel;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private apiClientService: ApiClientService
    ) { }

    ngOnInit() {
        this.init();
        this.route.params.subscribe(params => {
            this.init();
        });
    }

    private init() {
        this.entityName = this.route.snapshot.paramMap.get('entity').replace('-', '_');
        this.routeLinkTemplate = this.router.url + '/';
        this.collection$ =  this.apiClientService.getCollection(
            this.entityName
        );
    }
}
