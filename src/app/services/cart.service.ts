import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = environment.baseUrl;
  constructor(private httpClient:HttpClient) { }

  add(cart:Cart):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "baskets/add", cart);
  }
  get():Observable<ListResponseModel<Cart>>{
return this.httpClient.get<ListResponseModel<Cart>>(this.apiUrl+"baskets/getall")
  }
}
