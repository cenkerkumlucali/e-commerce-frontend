import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favorite } from '../models/favorite';
import { FavoriteDetails } from '../models/favoriteDetails';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  apiUrl = environment.baseUrl
  constructor(private httpClient: HttpClient) { }

  getAllDetails(): Observable<ListResponseModel<Favorite>> {
    return this.httpClient.get<ListResponseModel<Favorite>>(this.apiUrl + "favorites/getall");
  }

  getDetailsByUserId(userId: number): Observable<ListResponseModel<FavoriteDetails>> {
    return this.httpClient.get<ListResponseModel<FavoriteDetails>>(this.apiUrl + "favorites/getalldetailsbyuserid?userId=" + userId);
  }
  getAllDetailsFilteredAscByUserId(userId: number): Observable<ListResponseModel<FavoriteDetails>> {
    return this.httpClient.get<ListResponseModel<FavoriteDetails>>(this.apiUrl + "favorites/getalldetailsfilteredascbyuserid?userId=" + userId);
  }

  getAllDetailsFilteredDescByUserId(userId: number): Observable<ListResponseModel<FavoriteDetails>> {
    return this.httpClient.get<ListResponseModel<FavoriteDetails>>(this.apiUrl + "favorites/getalldetailsfiltereddescbyuserid?userId=" + userId);
  }
  add(favorite: Favorite): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "favorites/add", favorite)

  }
  delete(favorite: Favorite): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "favorites/delete", favorite)

  }
}
