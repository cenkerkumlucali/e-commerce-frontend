import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetail } from '../models/order-detail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  apiUrl = environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  addOrderDetail(orderDetail:OrderDetail[]):Observable<ResponseModel>{
   return this.httpClient.post<ResponseModel>(this.apiUrl+"orderdetails/add",orderDetail)
  }
}
