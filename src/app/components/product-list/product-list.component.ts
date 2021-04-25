import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  productAddedToCart:boolean=false;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
    });
  }
  getProductByCategory(categoryId: number) {
    this.productService
      .getProductByCategory(categoryId)
      .subscribe((response) => {
        this.product = response.data[0];
      });
  }
  addToCart(product: Product) {
    this.productAddedToCart = false;
    this.cartService
      .add({
        productId: product.id,
        userId: 1,
        count: 1,
        id: 0,
      })
      .subscribe((response) => {this.productAddedToCart=true;});
  }
}
