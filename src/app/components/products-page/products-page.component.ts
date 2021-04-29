import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
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
  brands:Brand[]=[]
  imageBasePath = environment.imageUrl;
  defaultImg="";
  constructor(private productService:ProductService,
              private activatedRoute:ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(params['brands']){
        this.getProducyByBrandId(params["brands"])
      }
      this.getProducts()
    })
  }

  getProducts(){
    this.productService.getProductDetails().subscribe(response=>{
      this.productDetail = response.data
    })
  }
  getProducyByBrandId(brandId:number){
    this.productService.getProductDetailByBrandId(brandId).subscribe(response=>{
      this.productDetail = response.data
    })
  }

}
