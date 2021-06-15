import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductAddComponent } from './admin-products/product-add/product-add.component';
import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductEditComponent } from './admin-products/product-edit/product-edit.component';
@NgModule({
  declarations: [
    ProductAddComponent,
    AdminNavbarComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminProductsComponent,
    ProductEditComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
  ]
})
export class AdminModule { }
