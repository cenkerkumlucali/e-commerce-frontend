import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: Category[] = []
  email = this.localStorageService.get('email');
  user: User = new User();
  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.checkToLogin();
    this.checkToEmail();
    this.getEmail();

  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data
    })
  }
  checkToLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  checkToEmail() {
    if (this.localStorageService.get('email')) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.localStorageService.clean()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["/"])
  }

  getEmail() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe(response => {
        this.user = response;
      })
    }
  }
}
