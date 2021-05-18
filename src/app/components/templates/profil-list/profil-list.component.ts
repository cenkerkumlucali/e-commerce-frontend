import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.css']
})
export class ProfilListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getProfilEditClass(){
    return "list-group-item active"
 }

}
