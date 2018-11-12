import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '@crud/modules/list/component/list.component';
import { NewComponent } from '@crud/modules/new/component/new.component';
import { EditComponent } from '@crud/modules/edit/component/edit.component';


const routes: Routes = [
    {
        path: ':entity',
        component: ListComponent
    },
    {
        path: ':entity/new',
        component: NewComponent
    },
    {
        path: ':entity/edit/:id',
        component: EditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntityRoutingModule {}
    