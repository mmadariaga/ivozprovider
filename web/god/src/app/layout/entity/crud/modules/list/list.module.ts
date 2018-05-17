import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './component/list.component';
import { PageHeaderModule } from '@shared/modules/page-header/page-header.module';

import ApiClientService from '@crud/services/ApiClient.service'

@NgModule({
    imports: [CommonModule, ListRoutingModule, PageHeaderModule],
    providers: [ApiClientService],
    declarations: [ListComponent]
})
export class ListModule {}
