import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PaymentInformationComponent } from './components/payment-information/payment-information.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { AddressTransactionsComponent } from './components/profil/address-transactions/address-transactions.component';
import { CreditCardOperationComponent } from './components/profil/credit-card-operation/credit-card-operation.component';
import { OrdersComponent } from './components/profil/orders/orders.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",component:MainPageComponent},
  {path:"login",component:LoginComponent}, 
  {path:"products",component:ProductsPageComponent}, 
  {path:"register",component:RegisterComponent},
  {path:"paymentinformation/:productId",component:PaymentInformationComponent},
  {path:'product/detail/:productId', component: ProductDetailComponent},
  {path:'cart',component: CartComponent,canActivate:[LoginGuard]}, 
  {path:'favorite',component: FavoriteComponent,canActivate:[LoginGuard]},
  {path:'products/category/:categoryId', component: ProductsPageComponent },
  {path:'products/brand/:brandId', component: ProductsPageComponent},
  {path:"profil",component:ProfilComponent,canActivate:[LoginGuard]},
  {path:"address",component:AddressTransactionsComponent,canActivate:[LoginGuard]},
  {path:"orders",component:OrdersComponent,canActivate:[LoginGuard]},
  {path:"creditcard",component:CreditCardOperationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
