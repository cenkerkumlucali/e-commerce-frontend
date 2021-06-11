import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductComment } from 'src/app/models/productComment';
import { ProductDetail } from 'src/app/models/productDetail';
import { UserComment } from 'src/app/models/userComment';
import { AuthService } from 'src/app/services/auth.service';
import { ProductCommentService } from 'src/app/services/product-comment.service';

@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit {
  @Input() commentForUpdate: ProductComment

  productDto: ProductDetail
  commentForm: FormGroup
  productCommentForm: FormGroup
  selectedComment: ProductComment
  comments: UserComment
  currentRate: number = 3;
  currentComment: ProductComment = {
    id: 0,
    userId: this.authService.getCurrentUserId(),
    comment: ""
  }
  constructor(private toastrService: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private productCommentService: ProductCommentService
  ) { }

  ngOnInit(): void {
    this.setProductCommentForm()
  }

  setProductCommentForm() {
    this.productCommentForm = this.formBuilder.group({
      userId: [this.authService.getCurrentUserId(), Validators.required],
      productId: [this.commentForUpdate ? this.commentForUpdate.productId : "", Validators.required],
      comment: [this.commentForUpdate ? this.commentForUpdate.comment : "", Validators.required]
    })
  }
  commentUpdate() {
    if (this.productCommentForm.valid) {
      let commentModel = Object.assign({}, this.productCommentForm.value)
      commentModel.id = this.commentForUpdate.id
      this.productCommentService.update(commentModel).subscribe((response) => {
        this.toastrService.success(response.message)
        setTimeout(() => window.location.reload())
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          console.log(responseError.error.Errors)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata"
            )
          }
        }
      })
    }
  }

  ngDoCheck() {
    if (this.commentForUpdate?.comment !== this.currentComment?.comment) {
      this.currentComment.comment = this.commentForUpdate?.comment
      this.productCommentForm.patchValue({
        comment: this.currentComment?.comment,
      })
    }
  }
  setCommentInfos() {
    this.commentForm.patchValue(
      this.selectedComment
    )
  }
}
