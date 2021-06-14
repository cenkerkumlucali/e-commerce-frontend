import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [

  {
    path: "",
    component: AdminComponent,
    children: [
      { path: 'product/add', component: ProductAddComponent, canActivate: [AdminGuard] },
      { path: 'products', component: AdminProductsComponent, canActivate: [AdminGuard] },
      { path: 'login', component: AdminLoginComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
