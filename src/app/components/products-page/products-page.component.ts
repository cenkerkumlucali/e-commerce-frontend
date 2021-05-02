import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
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
  constructor(private productService:ProductService,
              private activatedRoute:ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['brandId']){
        this.getProductByBrandId(params["brandId"])
      }else{
        this.getProducts()
      }
    })
    this.activatedRoute.params.subscribe(params=>{
      if(params['categoryId']){  
        this.getProductsDetailByCategoryId(params['categoryId'])
      }
    })
  }

  getProducts(){
    this.productService.getProductDetails().subscribe(response=>{
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

}
