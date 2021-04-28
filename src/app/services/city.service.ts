import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl = environment.baseUrl;
  constructor(private httpClient:HttpClient) { }

  add(city:City):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cities/add", city);
  }
  get():Observable<ListResponseModel<City>>{
  return this.httpClient.get<ListResponseModel<City>>(this.apiUrl+"cities/getall")
  }
}