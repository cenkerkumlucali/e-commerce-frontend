import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  productDetail:ProductDetail[]=[]
  productAddedToCart:boolean=false;
  imageBasePath = environment.imageUrl;
  defaultImg=""
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductDetails()
  }

  getProduct() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
    });
  }
  getProductDetails() {
    this.productService.getProductDetails().subscribe((response) => {
      this.productDetail = response.data;
    });
  }
  getProductByCategory(categoryId: number) {
    this.productService
      .getProductByCategory(categoryId)
      .subscribe((response) => {
        this.product = response.data[0];
      });
  }
  addToCart(product: ProductDetail) {
    this.productAddedToCart = false;
    this.cartService
      .add({
        productId: product.productId,
        userId: 1,
        count: 1,
        id: 0,
      })
      .subscribe((response) => {this.productAddedToCart=true;});
  }
}
