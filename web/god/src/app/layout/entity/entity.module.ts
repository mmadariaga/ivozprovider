import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityRoutingModule } from './entity-routing.module'
import { LayoutComponent } from '../layout.component';
import { ListModule } from '@crud/modules/list/list.module';
import { NewModule } from '@crud/modules/new/new.module';
import { EditModule } from '@crud/modules/edit/edit.module';

@NgModule({
  imports: [
    CommonModule,
    EntityRoutingModule,
    ListModule,
    NewModule,
    EditModule
  ],
  declarations: []
})
export class EntityModule { }
