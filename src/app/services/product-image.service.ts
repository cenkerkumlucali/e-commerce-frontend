import { SingleResponseModel } from './../models/singleResponseModel';
import { ListResponseModel } from './../models/listResponseModel';
import { ProductImage } from './../models/productImage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  apiUrl = environment.baseUrl
  constructor(private httpClient: HttpClient) { }

  add(image: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "productimage/add", image)
  }
  delete(image:ProductImage){
    return this.httpClient.post(this.apiUrl + "productimage/delete" , image)
  }


}
