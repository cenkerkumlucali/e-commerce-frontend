import { NumberDataResponseModel } from './../../models/numberDataResponseModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  minPrice:number
  maxPrice:number
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
  getProductDetailsByMinPriceAndMaxPrice(minPrice:number,maxPrice:number){
    this.productService.getProductDetailsByMinPriceAndMaxPrice(minPrice,maxPrice).subscribe((response)=>{
      this.productDetail = response.data
      this.minPrice = minPrice
      this.maxPrice = maxPrice
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
      id:product.id,
      brandId:product.brandId,
      userId:this.authService.getCurrentUserId(),
      count:1
    }).subscribe((response)=>{
      this.toastrService.success("Sepete eklendi")
    })
  }

}
