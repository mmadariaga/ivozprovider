import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './demo/dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './demo/charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './demo/tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './demo/form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './demo/bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './demo/grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './demo/bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './demo/blank-page/blank-page.module#BlankPageModule' },
            { path: 'entity', loadChildren: './entity/entity.module#EntityModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
