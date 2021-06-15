import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
import { UserComment } from 'src/app/models/userComment';
import { AuthService } from 'src/app/services/auth.service';
import { ProductCommentService } from 'src/app/services/product-comment.service';
import { UserCommentService } from 'src/app/services/user-comment.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  productDto:ProductDetail
  commentForm:FormGroup
  productCommentForm:FormGroup
  comments:UserComment
  currentRate : number = 3;  
  constructor(
    private toastrService: ToastrService,
    private authService:AuthService,
    private userCommentService:UserCommentService,
    private confirmationService:ConfirmationService,
    private config:DynamicDialogConfig,
    private formBuilder:FormBuilder,
    private productCommentService:ProductCommentService

  ) { }

  ngOnInit(): void {
    this.getProduct()
    this.setCommentForm()
    this.setProductCommentForm()
  }

  getProduct(){
    this.productDto = this.config.data.productDto
  }

  setCommentForm(){
    this.commentForm = this.formBuilder.group({
      userId:[this.authService.getCurrentUserId(),Validators.required],
      productId:[this.productDto.id = this.config.data.productDto.productId,Validators.required],
      comment:["",Validators.required]
    })
  }
  setProductCommentForm(){
    this.productCommentForm = this.formBuilder.group({
      userId:[this.authService.getCurrentUserId(),Validators.required],
      productId:[this.productDto.id = this.config.data.productDto.productId,Validators.required],
      comment:["",Validators.required]
    })
  }
  
  comment(){
    if(this.commentForm.valid){
      let commentModel = Object.assign({},this.commentForm.value)
      this.userCommentService.add(commentModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Başarılı")
        this.productCommentService.add(commentModel).subscribe((response1)=>{
          setTimeout(()=>window.location.reload())
        })
      },responseError=>{
          if(responseError.error.Errors.length>0){
            console.log(responseError.error.Errors)
            for (let i = 0; i < responseError.error.Errors.length; i++) {
  
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Hata"
              )
            }
          }
      })
    }
     
}
}
