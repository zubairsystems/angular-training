import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './components/users/users.component';
import { AddOrEditComponent } from './components/add-or-edit/add-or-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './components/view/view.component';


@NgModule({
  declarations: [
    UsersComponent,
    AddOrEditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
