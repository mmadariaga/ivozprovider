import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    // { path: '', loadChildren: '@layouts/content/content.module#ContentModule', canActivate: [AuthGuard] },
    { path: '', loadChildren: '@pages/gcharts/gcharts.module#GchartsModule' },
    { path: 'login', loadChildren: '@layouts/login/login.module#LoginModule' },
    { path: 'signup', loadChildren: '@layouts/signup/signup.module#SignupModule' },
    { path: 'error', loadChildren: '@layouts/server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: '@layouts/access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: '@layouts/not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: '@layouts/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
