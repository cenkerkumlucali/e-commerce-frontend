import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Favorite } from 'src/app/models/favorite';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favorites:Favorite[]=[]

  constructor(private favoriteService:FavoriteService,
  
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
  this.favoriteService.getAll().subscribe((response)=>{
    this.favorites = response.data
  })
  }

  delete(favorite:Favorite){
    this.favoriteService.Delete(favorite).subscribe((response)=>{
      this.toastrService.success(response.message)
    })
  }
}
