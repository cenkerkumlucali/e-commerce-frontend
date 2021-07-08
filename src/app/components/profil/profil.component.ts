import { UserImageService } from './../../services/user-image.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { UserImage } from 'src/app/models/userImage';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  imageBaseUrl = environment.imageUrl
  users: UserDetail
  Image:string
  defaultImg = "/images/NotFoundImageForUser.png"
  profileForm: FormGroup;
  email: string;
  password: FormControl
  user: User = new User()
  status: string
  currentUser: User
  formData = new FormData();
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userImageService: UserImageService
  ) { }

  ngOnInit(): void {
    this.createProfileUpdateForm();
    this.email = localStorage.getItem('email')
    this.getUser();
    this.getUserDetailsById()
  }
  getUserDetailsById() {
    this.userService.getUserDetailsById(this.authService.getCurrentUserId()).subscribe((response) => {
      this.users = response.data[0]
      this.Image = this.users.image.imagePath
    })
  }
  createProfileUpdateForm() {
    this.profileForm = this.formBuilder.group({
      id: this.user.id,
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      status: true
    })
  }
  getUser() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe(response => {
        this.user = response
        if (response.status) {
          this.status = "Aktif"
        } else {
          this.status = "Aktif değil"
        }
      }, responseError => {
        this.toastrService.error(responseError.error)
      })
    }
  }
  updateProfile() {
    if (this.profileForm.valid) {
      if (this.users?.image?.imagePath?.length === 0) {
        this.addImage();
      } else {
        let profilModel = Object.assign({}, this.profileForm.value);
        this.userService.profileUpdate(profilModel).subscribe(response => {
          this.updateImage();
          this.toastrService.success(response.message);
          setTimeout(() => window.location.reload(), 500);
        }, responseError => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,
              );
            }
          }
        });
      }
    } else {
      this.toastrService.error("Formu boş bırakmayınız");
    }
  }
  /*User Image Operation Started*/
  addImage() {
    this.formData.append('userId', this.user.id.toPrecision())
    this.userImageService.add(this.formData).subscribe((response) => { })
  }
  deleteImage(image: UserImage) {
    this.userImageService.delete(image).subscribe((response) => { })
  }
  updateImage() {
    this.formData.set('id', this.users.image.id.toPrecision())
    this.formData.append('userId', this.user.id.toPrecision())
    this.userImageService.update(this.formData).subscribe((response) => { })
  }
  onSelectFile(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      let selectedFile = <File>fileInput.target.files[i];
      this.formData.append('image', selectedFile)
    }
  }


  /*User Image Operation Ended*/
  getCurrentCategoryClass() {
    return "list-group-item active"
  }
  getProfilEditClass() {
    if (!this.currentUser) {
      return "list-group-item active"
    } else {
      return "list-group-item "
    }
  }
}
