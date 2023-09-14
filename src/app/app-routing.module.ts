import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'products', loadChildren: ()=> import('./product/product.module').then(m => m.ProductModule)},
  {path: 'categories', loadChildren: ()=> import('./category/category.module').then(m => m.CategoryModule)},
  {path: 'users', loadChildren: ()=> import('./user/user.module').then(m => m.UserModule)},
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
