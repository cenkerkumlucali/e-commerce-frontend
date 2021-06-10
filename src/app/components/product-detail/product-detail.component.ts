import { ProductComment } from './../../models/productComment';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Component, OnInit } from '@angular/core';
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
  products: ProductDetail[] = []
  productDto: ProductDetail
  brandId: number
  productComment: ProductCommentDetails[] = []
  Images: string[] = []
  imageBasePath = environment.imageUrl;
  defaultImg = "/images/default.jpg"
  favoriteText = "Favoriye ekle"
  favoriteId: number
  constructor(private productService: ProductService,
    private productCommentService: ProductCommentService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    public  authService: AuthService,
    private dialogService: DialogService,
    private favoriteService: FavoriteService,
    private commentService:ProductCommentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      if (params["productId"]) {
        await this.getProductDetail(params["productId"]);
        this.getCommentByProductId(params["productId"]);
      }
    });
  }
  async getProductDetail(productId: number) {
    let productDetail = (await this.productService.getProductDetailByProductId(productId).toPromise())
    this.productDto = productDetail.data[0];
    this.Images = this.productDto.images;
    this.getProductDetailByBrandId()
  }
  getProductDetailByBrandId() {
    this.productService.getProductDetailByBrandId(this.productDto.brandId).subscribe((response) => {
      this.products = response.data
      this.Images = this.productDto.images;
    })
  }
  getCommentByProductId(productId: number) {
    this.productCommentService.getDetailByProductId(productId).subscribe((response) => {
      this.productComment = response.data
    })
  }
  getByIdAddFavorite() {
    if (this.favoriteText === "Favoriye ekle") {
      this.favoriteService.getByIdAdd({ productId: this.productDto.productId, brandId: this.productDto.brandId, userId: this.authService.getCurrentUserId(), createDate: new Date() })
        .subscribe((response) => {
          this.favoriteText = "Favoriden çıkar"
          this.favoriteId = response.data
          this.toastrService.success(response.message)
        })
    } else {
      this.favoriteService.delete({ id: this.favoriteId }).subscribe((response) => {
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
      count: 1
    }).subscribe((response) => {
      this.toastrService.success(response.message)
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
  deleteComment(productComment:ProductComment){
    this.productCommentService.delete(productComment).subscribe((response)=>{
      this.toastrService.success(response.message)
      setTimeout(()=>window.location.reload(),1500)
    })
  }
}
