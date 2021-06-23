import {UserGuard} from './guards/user.guard';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import {AdminGuard} from './guards/admin.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {ProductAddComponent} from './components/admin/admin-products/product-add/product-add.component';
import {CartComponent} from './components/cart/cart.component';
import {FavoriteComponent} from './components/favorite/favorite.component';
import {LoginComponent} from './components/login/login.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {PaymentInformationComponent} from './components/payment-information/payment-information.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ProductsPageComponent} from './components/products-page/products-page.component';
import {AddressTransactionsComponent} from './components/profil/address-transactions/address-transactions.component';
import {CreditCardOperationComponent} from './components/profil/credit-card-operation/credit-card-operation.component';
import {OrdersComponent} from './components/profil/orders/orders.component';
import {ProfilComponent} from './components/profil/profil.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginGuard} from './guards/login.guard';
import {Observable} from 'rxjs/Observable';
import {ResetPasswordComponent} from './components/profil/reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsPageComponent, canActivate: [UserGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'paymentinformation/:productId', component: PaymentInformationComponent},
  {path: 'product/detail/:productId', component: ProductDetailComponent},
  {path: 'cart', component: CartComponent},
  {path: 'favorite', component: FavoriteComponent, canActivate: [LoginGuard, UserGuard]},
  {path: 'products/category/:categoryId', component: ProductsPageComponent, canActivate: [UserGuard]},
  {path: 'products/brand/:brandId', component: ProductsPageComponent, canActivate: [UserGuard]},
  {
    path: 'profil', children: [
      {path: 'edit', component: ProfilComponent, canActivate: [LoginGuard, UserGuard]},
      {path: 'changepassword', component: ResetPasswordComponent, canActivate: [LoginGuard, UserGuard]},
      {path: 'address', component: AddressTransactionsComponent, canActivate: [LoginGuard, UserGuard]},
      {path: 'orders', component: OrdersComponent, canActivate: [LoginGuard, UserGuard]},
      {path: 'creditcard', component: CreditCardOperationComponent, canActivate: [UserGuard]},
    ]
  },

  {path: 'product/add', component: ProductAddComponent, canActivate: [UserGuard]},
  {path: 'admin', component: AdminComponent, loadChildren: () => import('./components/admin/admin.module').then((c) => c.AdminModule)},
  {path: 'admin/login', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
