import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'

import { AdminRoutingModule } from './admin-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './navbar/navbar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CarouselModule } from 'ng-bootstrap';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  declarations: [
    ProductAddComponent,
    AdminNavbarComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    JwtModule,  
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    CarouselModule,
    NgbModule,
    NgbPaginationModule, 
    MultiSelectModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
  ]
})
export class AdminModule { }
