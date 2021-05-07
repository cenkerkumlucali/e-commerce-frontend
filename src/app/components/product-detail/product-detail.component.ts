import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { CommentComponent } from '../comment/comment.component';

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
  constructor(private productService:ProductService,
              private activatedRoute:ActivatedRoute,
              private toastrService:ToastrService,
              private cartService:CartService,
              private authService:AuthService,
              private dialogService:DialogService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["productId"]){
        this.getProductDetail(params["productId"]);
        this.getProductDetailByBrandId(params["productId"]);
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
  getProductDetailByBrandId(brandId:number){
    this.productService.getProductDetailByBrandId(brandId).subscribe((response)=>{
      this.products = response.data
      console.log(response.data)
      this.Images=this.productDto.images
    })
  }
  addToCart(product:ProductDetail){
    this.cartService.add({
      userId:this.authService.getCurrentUserId(),
      brandId:product.brandId,
      productId:product.productId,
      count:1
    }).subscribe((response)=>{
      this.toastrService.success(response.message)
    })
  }
  openComment() {
    const ref = this.dialogService.open(CommentComponent, {
      data: {
        productDto: this.productDto
      },
      header: 'Yorum yap',
      width: '40%'
    });
  }
}
