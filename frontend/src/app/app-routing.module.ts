import { ResponseresetpasswordComponent } from './responseresetpassword/responseresetpassword.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
  
    { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },

    { path: 'memberSignup', loadChildren: () => import('./member-login/member-login.module').then(m => m.MemberLoginModule) },

    
    { path: 'error', loadChildren: () => import('./server-error/server-error.module').then(m => m.ServerErrorModule) },
    { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
    { path: 'webpage', loadChildren: () => import('./webpage/webpage.module').then(m => m.WebpageModule) },
   
    {
        path: 'request-reset-password',
        component: PasswordchangeComponent,
      },
      {
        path: 'response-reset-password/:token',
        component: ResponseresetpasswordComponent
      },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
