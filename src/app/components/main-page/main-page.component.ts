import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandDetail } from 'src/app/models/brandDetail';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  products: Product[] = [];
  brandDetail: BrandDetail[] = []
  productDetail: ProductDetail[] = []
  cart: Cart
  product: Product;
  productAddedToCart: boolean = false;
  imageBasePath = environment.imageUrl;
  defaultImg = ""
  limit=12
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private brandService: BrandService,
  ) { }

  ngOnInit(): void {
    this.getProductDetails()
    this.getBrandsDetail()
    this.getLimitedProducts(this.limit)
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
  getBrandsDetail() {
    this.brandService.getBrandsDetail().subscribe((response) => {
      this.brandDetail = response.data
    })
  }

  checkToLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    else {
      return false;
    }
  }
  getLimitedProducts(limit:number){
    this.productService.getProductLimited(limit).subscribe((response)=>{
      this.productDetail = response.data
      console.log(response.data)
    })
  }
}
