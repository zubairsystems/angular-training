import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddOrEditComponent } from './components/add-or-edit/add-or-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    AddOrEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
