import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageHeaderModule, FormElementModule } from '@shared/index';

import ApiClientService from '@crud/services/ApiClient.service';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './component/edit.component';

@NgModule({
    imports: [
        CommonModule,
        EditRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        FormElementModule,
    ],
    providers: [ApiClientService],
    declarations: [EditComponent]
})
export class EditModule {}
