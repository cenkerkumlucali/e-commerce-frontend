import { stringify } from '@angular/compiler/src/util';
import { FormGroup, FormBuilder, Validator, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserUpdateDto } from '../../../models/userUpdateDto';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userUpdateDto: UserUpdateDto = new UserUpdateDto()
  userUpdateForm: FormGroup
  newPassword: string
  newPasswordVerify: string
  oldPassword: string
  constructor(private userService: UserService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUserById()
    this.createPasswordEdit()
  }

  getUserById() {
    this.userService.getByUserId(this.authService.getCurrentUserId()).subscribe((response) => {
      this.userUpdateDto.user = response.data
    })
  }
  editPassword() {
    let updateModel = Object.assign({}, this.userUpdateForm.value)
    this.userUpdateDto.password = this.userUpdateForm.value.oldPassword
    this.userService.passwordEdit(this.userUpdateDto, this.userUpdateForm.value.newPassword, this.userUpdateForm.value.newPasswordVerify).subscribe((response) => {
      this.toastrService.success(response.message)
    }, responseError => {
      this.toastrService.error(responseError.error.message)
      
    })
  }
  createPasswordEdit() {
    this.userUpdateForm = this.formBuilder.group({
      oldPassword: this.oldPassword,
      newPassword: [this.newPassword, Validators.required],
      newPasswordVerify: [this.newPasswordVerify, Validators.required]
    })
  }

}
