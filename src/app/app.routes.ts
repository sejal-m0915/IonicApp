import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./Components/Pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'client',
    loadComponent: () => import('./Components/Layouts/inner-layout/inner-layout.page').then((m) => m.InnerLayoutPage),
    loadChildren: () => import('./Modules/inner/inner.module').then((m) => m.InnerModule),
    canLoad: [AuthGuard]
  },
  {  // Wildcard route for a 404 page
    path: '**',
    loadComponent: () => import('./Components/Common/page-not-found/page-not-found.page')
      .then((m) => m.PageNotFoundPage),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
