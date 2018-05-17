import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent, NewComponent, EditComponent } from '@crud/index';

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
    }/*,
    {
        path: ':entity/delete',
        component: DeleteComponent
    }
    */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntityRoutingModule {}
