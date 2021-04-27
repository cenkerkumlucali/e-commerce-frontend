import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from 'src/app/models/productDetail';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  products:ProductDetail[]=[]
  productDto:ProductDetail
  Images:string[]=[]
  imageBasePath = environment.imageUrl;
  defaultImg="/images/default.jpg"
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["productId"]){
        this.getProductDetail(params["productId"]);
      }
     
    });
  }

  getProductDetail(productId:number){
    this.productService.getProductDetailByProductId(productId).subscribe(response=>{
      this.products = response.data
      this.productDto = response.data[0]
      this.Images=this.productDto.images
    })
  }


}
