import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityRoutingModule } from './entity-routing.module';
import { ListModule } from '@crud/modules/list/list.module';
import { NewModule } from '@crud/modules/new/new.module';
import { EditModule } from '@crud/modules/edit/edit.module';
import { ApiClientService } from "@crud/services/ApiClient.service";

@NgModule({
  imports: [
    CommonModule,
    EntityRoutingModule
  ],
  exports: [
      ListModule,
      NewModule,
      EditModule
  ],
  declarations: [],
  providers: [ApiClientService]
})
export class EntityModule { }
