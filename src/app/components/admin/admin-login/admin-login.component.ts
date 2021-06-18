import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.localStorageService.set('token', response.data.token)
        this.localStorageService.set('email', this.loginForm.value.email)
        this.router.navigate(["admin/products"]).then(r => window.location.reload())
      }, responseError => {
        this.toastrService.error(responseError.error)
      })
    } else {
      this.toastrService.error("Lütfen formu doldurunuz")
    }
  }


}
