import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Favorite } from 'src/app/models/favorite';
import { FavoriteDetails } from 'src/app/models/favoriteDetails';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favorites:Favorite[]=[]
  favoriteDetails:FavoriteDetails[]=[]
  constructor(private favoriteService:FavoriteService,
              private authService:AuthService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getDetails()
    this.getDetailsByUserId()
  }

  getDetails(){
  this.favoriteService.getAllDetails().subscribe((response)=>{
    this.favorites = response.data
  })
  }
  getDetailsByUserId(){
    this.favoriteService.getDetailsByUserId(this.authService.getCurrentUserId()).subscribe((response)=>{
      this.favoriteDetails = response.data
      console.log(response.data);
      
    })
    }

  delete(favorite:Favorite){
    this.favoriteService.Delete(favorite).subscribe((response)=>{
      this.toastrService.success(response.message)
    })
  }
}
