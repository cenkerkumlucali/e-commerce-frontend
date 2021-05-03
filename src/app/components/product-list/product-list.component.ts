import { Component, OnInit } from '@angular/core';
import { BrandDetail } from 'src/app/models/brandDetail';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
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
  brandDetail:BrandDetail[]=[]
  productDetail:ProductDetail[]=[]
  product: Product;
  productAddedToCart:boolean=false;
  imageBasePath = environment.imageUrl;
  defaultImg=""
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService:AuthService,
    private brandService:BrandService
  ) {}

  ngOnInit(): void {
    this.getProductDetails()
    this.getBrandsDetail()
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
  getBrandsDetail(){
    this.brandService.getBrandsDetail().subscribe((response)=>{
      this.brandDetail = response.data
      })
  }
  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    else{
      return false;
    }
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
