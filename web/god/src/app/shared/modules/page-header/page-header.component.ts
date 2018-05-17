import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-page-header',
    template: `
        <div class="row">
            <div class="col-xl-12">
                <h2 class="page-header">
                    {{heading}}
                </h2>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <i class="fa fa-dashboard"></i> <a href="Javascript:void(0)" [routerLink]="['/dashboard']">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active"><i class="fa {{icon}}"></i> {{heading}}</li>
                </ol>
            </div>
        </div>
    `
})
export class PageHeaderComponent implements OnInit {
    @Input() heading: string;
    @Input() icon: string;
    constructor() {}

    ngOnInit() {}
}
