import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: DashboardComponent
  },
  {
    path: 'products',
    canActivateChild: [authGuard],
    loadChildren: ()=> import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'categories',
    canActivateChild: [authGuard],
    loadChildren: ()=> import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'users',
    canActivateChild: [authGuard],
    loadChildren: ()=> import('./user/user.module').then(m => m.UserModule)
  },

  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
