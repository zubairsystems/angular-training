import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { AddOrEditComponent } from './components/add-or-edit/add-or-edit.component';
import { ViewComponent } from './components/view/view.component';

@NgModule({
  declarations: [
    ProductsComponent,
    AddOrEditComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
