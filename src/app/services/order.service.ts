import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Order } from '../models/order';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  
  addOrder(order:Order):Observable<ResponseModel>{
    let newPath = this.apiUrl + "orders/add"
    return this.httpClient.post<ResponseModel>(newPath,order)
  }
}
