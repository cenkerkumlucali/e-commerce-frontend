import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiUrl = environment.baseUrl;
  constructor(private httpClient:HttpClient) { }

  add(country:Country):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "countries/add", country);
  }
  get():Observable<ListResponseModel<Country>>{
  return this.httpClient.get<ListResponseModel<Country>>(this.apiUrl+"countries/getall")
  }
}