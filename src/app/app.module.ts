import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmationService } from 'primeng/api';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { from } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/profil/reset-password/reset-password.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { PaymentInformationComponent } from './components/payment-information/payment-information.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { CartComponent } from './components/cart/cart.component';
import { LoginGuard } from './guards/login.guard';
import { CommentComponent } from './components/comment/comment.component';
import { ProductCardComponent } from './components/templates/product-card/product-card.component';
import { AddressTransactionsComponent } from './components/profil/address-transactions/address-transactions.component';
import { AddressUpdateComponent } from './components/profil/address-transactions/address-update/address-update.component';
import { ProfilListComponent } from './components/templates/profil-list/profil-list.component';
import { CreditCardOperationComponent } from './components/profil/credit-card-operation/credit-card-operation.component';
import { OrdersComponent } from './components/profil/orders/orders.component';
import { CreditCardAddComponent } from './components/profil/credit-card-operation/credit-card-add/credit-card-add.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentUpdateComponent } from './components/comment/comment-update/comment-update.component';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarComponent,
    CategoryComponent,
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
    CommentComponent,
    ProductCardComponent,
    AddressUpdateComponent,
    OrdersComponent,
    ProfilListComponent,
    CreditCardOperationComponent,
    CreditCardAddComponent,
    FavoriteComponent,
    CommentUpdateComponent,

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
    CarouselModule,
    NgbModule,
    NgbPaginationModule,
    MultiSelectModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginGuard,
    AdminGuard,
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
