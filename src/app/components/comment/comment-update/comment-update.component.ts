import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProductComment} from 'src/app/models/productComment';
import {ProductDetail} from 'src/app/models/productDetail';
import {UserComment} from 'src/app/models/userComment';
import {AuthService} from 'src/app/services/auth.service';
import {ProductCommentService} from 'src/app/services/product-comment.service';
import {UserCommentImageService} from '../../../services/user-comment-image.service';
import {ProductCommentDetails} from '../../../models/productCommentDetail';

@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit {
  @Input() commentForUpdate: ProductComment;

  productDto: ProductDetail;
  commentForm: FormGroup;
  productCommentForm: FormGroup;
  selectedComment: ProductComment;
  comments: UserComment;
  commentId: number;
  currentRate: number = 3;
  formData = new FormData();
  setUpdateComment: ProductComment = null;
  productCommentDetails: ProductCommentDetails[];
  currentComment: ProductComment = {
    id: 0,
    userId: this.authService.getCurrentUserId(),
    comment: ''
  };

  constructor(private toastrService: ToastrService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private productCommentService: ProductCommentService,
              private userCommentImageService: UserCommentImageService
  ) {
  }

  ngOnInit(): void {
    this.setProductCommentForm();
    this.getComment();
  }

  setProductCommentForm() {
    this.productCommentForm = this.formBuilder.group({
      userId: [this.authService.getCurrentUserId(), Validators.required],
      productId: [this.commentForUpdate ? this.commentForUpdate.productId : '', Validators.required],
      comment: [this.commentForUpdate ? this.commentForUpdate.comment : '', Validators.required]
    });
  }

  commentUpdate() {
    if (this.productCommentForm.valid) {
      let commentModel = Object.assign({}, this.productCommentForm.value);
      commentModel.id = this.commentForUpdate.id;
      this.productCommentService.update(commentModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.addImage();
        setTimeout(() => window.location.reload());
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          console.log(responseError.error.Errors);
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Hata'
            );
          }
        }
      });
    }

  }

  getComment() {
    this.productCommentService.getDetailByUserIdAndId(this.authService.getCurrentUserId(), this.commentForUpdate?.id).subscribe((response) => {
      this.productCommentDetails = response.data;
      console.log(response.data);
    });
  }

  onSelectFile(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      let selectedFile = <File> fileInput.target.files[i];
      this.formData.append('image', selectedFile);
    }
  }

  addImage() {
    this.formData.append('productId', this.commentForUpdate.productId.toPrecision());
    this.formData.append('userId', this.authService.getCurrentUserId().toPrecision());
    this.formData.append('commentId', this.commentForUpdate.id.toPrecision());
    this.userCommentImageService.add(this.formData).subscribe((response) => {
    });
  }

  ngDoCheck() {
    if (this.commentForUpdate?.id !== this.currentComment?.id,
      this.commentForUpdate?.productId !== this.currentComment?.productId,
    this.commentForUpdate?.comment !== this.currentComment?.comment) {
      this.currentComment.comment = this.commentForUpdate?.comment;
      this.currentComment.id = this.commentForUpdate?.id;
      this.currentComment.productId = this.commentForUpdate?.productId;
      this.productCommentForm.patchValue({
        comment: this.commentForUpdate?.comment,
        id: this.commentForUpdate?.id,
        productId: this.commentForUpdate?.productId,
      });
    }
  }

  setCommentInfos() {
    this.commentForm.patchValue(
      this.selectedComment
    );
  }

  setUpdatedComment(productComment: ProductComment) {
    this.setUpdateComment = productComment;
    console.log(productComment);
  }

  setCurrentComment(productComment: ProductComment) {
    this.currentComment = productComment;
  }

}
