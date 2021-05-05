import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {DropdownModule} from 'primeng/dropdown';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';

import { ConfirmationService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { from } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryComponent } from './components/category/category.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { DiscountPipe } from './components/pipes/discount.pipe';
import { PaymentInformationComponent } from './components/payment-information/payment-information.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { CartComponent } from './components/cart/cart.component';
import { LoginGuard } from './guards/login.guard';
import { AddressTransactionsComponent } from './components/address-transactions/address-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NavbarComponent,
    CategoryComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ProductDetailComponent,
    DiscountPipe,
    PaymentInformationComponent,
    PaymentComponent,
    ProfilComponent,
    ProductsPageComponent,
    BrandComponent,
    BrandFilterPipe,
    CartComponent,
    AddressTransactionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule,  
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    LoginGuard,
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
