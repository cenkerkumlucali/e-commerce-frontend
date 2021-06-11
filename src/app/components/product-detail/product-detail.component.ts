import { CommentUpdateComponent } from './../comment/comment-update/comment-update.component';
import { FavoriteDetails } from 'src/app/models/favoriteDetails';
import { ProductComment } from './../../models/productComment';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductCommentDetails } from 'src/app/models/productCommentDetail';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductCommentService } from 'src/app/services/product-comment.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: ProductDetail[]
  productDto: ProductDetail
  brandId: number
  productComment: ProductCommentDetails[]
  Images: string[]
  imageBasePath = environment.imageUrl;
  defaultImg = "/images/default.jpg"
  favoriteText = "Favoriye ekle"
  favoriteId: number
  productId: number
  favoriteDetails: FavoriteDetails
  setUpdateComment:ProductComment=null
  currentComment:ProductComment
  quantity:number=1

  constructor(private productService: ProductService,
    private productCommentService: ProductCommentService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    public authService: AuthService,
    private dialogService: DialogService,
    private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      if (params["productId"]) {
         this.getProductDetail(params["productId"]);
        this.getCommentByProductId(params["productId"]);
      }
    });
  }
  async getProductDetail(productId: number) {
    this.productService.getProductDetailByProductId(productId).subscribe((response)=>{
      this.productDto = response.data[0];
      this.Images = this.productDto.images;
      this.getProductDetailByBrandId()
      this.getFavoriteByUserIdAndId()

    })
    
  }
  getProductDetailByBrandId() {
    this.productService.getProductDetailByBrandId(this.productDto.brandId).subscribe((response) => {
      this.products = response.data
      this.Images = this.productDto.images;
    })
  }
  getFavoriteExists() {
    if (this.favoriteDetails.productId == this.productDto.productId) {
      this.favoriteText = "Favoriden çıkar"
    }
  }
  getFavoriteByUserIdAndId() {
    this.favoriteService.getDetailsByUserIdAndProductId(this.authService.getCurrentUserId(), this.productDto.productId).subscribe((response) => {
      this.favoriteDetails = response.data[0]
      this.getFavoriteExists()
    })
  }
  getByIdAddFavorite() {
    if (this.favoriteText === "Favoriye ekle") {
      this.favoriteService.getByIdAdd({ productId: this.productDto.productId, brandId: this.productDto.brandId, userId: this.authService.getCurrentUserId(), createDate: new Date() })
        .subscribe((response) => {
          this.favoriteText = "Favoriden çıkar"
          this.favoriteId = response.data
          this.toastrService.success(response.message)
          setTimeout(()=>window.location.reload(),1000)
        })
    } else {
      this.favoriteService.delete({ id: this.favoriteDetails.id, productId: this.productId }).subscribe((response) => {
        this.favoriteText = "Favoriye ekle"
        this.toastrService.success(response.message)
      })
    }
  }
  addToCart(product: ProductDetail) {
    this.cartService.add({
      userId: this.authService.getCurrentUserId(),
      brandId: product.brandId,
      productId: product.productId,
      count: this.quantity,
    }).subscribe((response) => {
      console.log(response);

      this.toastrService.success(response.message)
    })
  }
  increaseQuantity() {
    this.quantity++;
   }
   decreaseQuantity(){
     this.quantity--;
   }

  /*Comment Operation Started*/ 
  getCommentByProductId(productId: number) {
    this.productCommentService.getDetailByProductId(productId).subscribe((response) => {
      this.productComment = response.data
    })
  }
  openComment() {
    const ref = this.dialogService.open(CommentComponent, {
      data: {
        productDto: this.productDto
      },
      header: 'Yorum yap',
      width: '50%',
    });
  }
  deleteComment(productComment: ProductComment) {
    this.productCommentService.delete(productComment).subscribe((response) => {
      this.toastrService.success(response.message)
      setTimeout(() => window.location.reload(), 1500)
    })
  }

  setUpdatedComment(productComment:ProductComment){
    this.setUpdateComment = productComment
  }
  setCurrentComment(productComment:ProductComment){
    this.currentComment = productComment
  }
  /*Comment Operation Ended*/
}