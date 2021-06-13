import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: 'product/add', component: ProductAddComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
