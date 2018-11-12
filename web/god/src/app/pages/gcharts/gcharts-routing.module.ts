import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GchartsComponent } from './gcharts.component';

const routes: Routes = [
    {
        path: '',
        component: GchartsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GchartsRoutingModule {}
