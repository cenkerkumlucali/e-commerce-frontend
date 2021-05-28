import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  productDetail:ProductDetail[]=[]
  imageBasePath = environment.imageUrl;
  defaultImg="";
  categoryId:number
  productAddedToCart:boolean=false;
  constructor(private productService:ProductService,
              private activatedRoute:ActivatedRoute,
              private cartService:CartService,
              private authService:AuthService,
              private toastrService:ToastrService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['brandId']){
        this.getProductByBrandId(params["brandId"])

      }else if(params['categoryId']){
        this.getProductsDetailByCategoryId(params['categoryId'])
      }
      else{
        this.getProducts()
      }
    })
  }

  getProducts(){
    this.productService.getProductDetails().subscribe(response=>{
      this.productDetail = response.data
    })
  }
  getProductsEvaluation(){
    this.productService.getProductDetailsEvaluation().subscribe((response)=>{
      this.productDetail = response.data
    })
  }
  getProductsAsc(){
    this.productService.getProductDetailsAsc().subscribe(response=>{
      this.productDetail = response.data
    })
  }
   getProductsDesc(){
    this.productService.getProductDetailsDesc().subscribe(response=>{
      this.productDetail = response.data
    })
  }
  getProductsDetailByCategoryId(categoryId:number){
    this.productService.getProductDetailByCategoryId(categoryId).subscribe((response)=>{
      this.productDetail = response.data
      console.log(response.data)
    })
  }
  getProductByBrandId(brandId:number){
    this.productService.getProductDetailByBrandId(brandId).subscribe(response=>{
      this.productDetail = response.data
    })
  }
  addToCart(product:ProductDetail){
    this.productAddedToCart = false;
    this.cartService.add({
      productId:product.productId,
      brandId:product.brandId,
      userId:this.authService.getCurrentUserId(),
      count:1
    }).subscribe((response)=>{
      this.toastrService.success("Sepete eklendi")
    })
  }

}
