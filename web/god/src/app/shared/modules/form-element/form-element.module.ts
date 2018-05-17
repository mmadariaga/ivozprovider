import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementComponent } from './form-element.component';
import {
    TextElementComponent,
    BooleanElementComponent,
    EntityElementComponent
} from './implementations/index';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    declarations: [
        FormElementComponent,
        TextElementComponent,
        BooleanElementComponent,
        EntityElementComponent
    ],
    exports: [FormElementComponent]
})
export class FormElementModule {}
