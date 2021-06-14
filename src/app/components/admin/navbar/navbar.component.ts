import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-admin-navbar',     
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }
  checkToLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
  logOut() {
    this.localStorageService.clean()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["/admin/login"])
  }

}
