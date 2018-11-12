import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiClientService } from '@crud/services/ApiClient.service';

import { EditComponent } from './component/edit.component';
import { FormElementModule } from "@app/shared/modules/form-element/form-element.module";
import { PageHeaderModule } from "@app/shared/modules/page-header/page-header.module";

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        FormElementModule,
    ],
    providers: [ApiClientService],
    declarations: [EditComponent]
})
export class EditModule {}
