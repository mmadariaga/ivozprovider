import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './component/new.component';
import { PageHeaderModule } from '@shared/modules/page-header/page-header.module';

import ApiClientService from '@crud/services/ApiClient.service'

@NgModule({
    imports: [CommonModule, NewRoutingModule, PageHeaderModule],
    providers: [ApiClientService],
    declarations: [NewComponent]
})
export class NewModule {}
