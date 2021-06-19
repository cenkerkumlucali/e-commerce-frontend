import {UserCommentImageService} from './../../services/user-comment-image.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ProductDetail} from 'src/app/models/productDetail';
import {UserComment} from 'src/app/models/userComment';
import {AuthService} from 'src/app/services/auth.service';
import {ProductCommentService} from 'src/app/services/product-comment.service';
import {UserCommentService} from 'src/app/services/user-comment.service';
import {UserCommentImage} from '../../models/userCommentImage';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  productDto: ProductDetail;
  productCommentForm: FormGroup;
  comments: UserComment;
  userCommentImage: UserCommentImage;
  formData = new FormData();
  currentRate = 3;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private userCommentService: UserCommentService,
    private confirmationService: ConfirmationService,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private productCommentService: ProductCommentService,
    private userCommentImageService: UserCommentImageService
  ) {
  }

  ngOnInit(): void {
    this.getProduct();
    this.setProductCommentForm();
  }

  getProduct() {
    this.productDto = this.config.data.productDto;
  }

  setProductCommentForm() {
    this.productCommentForm = this.formBuilder.group({
      userId: [this.authService.getCurrentUserId(), Validators.required],
      productId: [this.productDto.id = this.config.data.productDto.id, Validators.required],
      comment: ['', Validators.required]
    });
  }


  comment() {
    if (this.productCommentForm.valid) {
      const commentModel = Object.assign({}, this.productCommentForm.value);
      this.productCommentService.getIdAdd(commentModel).subscribe((response) => {
        this.userCommentImage = {commentId : response.data};
        this.addImage();
        this.toastrService.success(response.message);
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
          }
        }
      });
    } else {
      this.toastrService.error('Lütfen formu doldurun');
    }
  }

  /*Image Operation Started*/

  onSelectFile(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      const selectedFile = fileInput.target.files[i] as File;
      this.formData.append('image', selectedFile);
    }
  }

  addImage() {
    this.formData.append('productId', this.config.data.productDto.id);
    this.formData.append('userId', this.authService.getCurrentUserId().toPrecision());
    this.formData.append('commentId', this.userCommentImage.commentId.toPrecision());
    this.userCommentImageService.add(this.formData).subscribe((response) => {});
  }

  /*Image Operation Ended*/
}
