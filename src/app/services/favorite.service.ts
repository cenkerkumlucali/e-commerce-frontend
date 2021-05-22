import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favorite } from '../models/favorite';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

 apiUrl=environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Favorite>>
{
  return this.httpClient.get<ListResponseModel<Favorite>>(this.apiUrl+ "favorites/getall");
}

Add(favorite:Favorite):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"favorites/add",favorite)

}
Delete(favorite:Favorite):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"favorites/delete",favorite)

}
}
