import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';

const routes: Routes = [
    {
        path: '',
        component: ContentComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: '@pages/dashboard/dashboard.module#DashboardModule' },
            // { path: 'charts', loadChildren: '@pages/charts/charts.module#ChartsModule' },
            // { path: 'google-charts', loadChildren: '@pages/gcharts/gcharts.module#GchartsModule' },
            { path: 'tables', loadChildren: '@pages/tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: '@pages/form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: '@pages/bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: '@pages/grid/grid.module#GridModule' },
            { path: 'components', loadChildren: '@pages/bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: '@pages/blank-page/blank-page.module#BlankPageModule' },
            { path: 'entity', loadChildren: '@shared/modules/entity/entity.module#EntityModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule {}
