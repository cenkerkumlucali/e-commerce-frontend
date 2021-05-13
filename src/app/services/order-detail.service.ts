import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { OrderDetail } from '../models/order-detail';
import { OrderDetailDto } from '../models/orderDetailDto';
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

  getOrderDetailByUserId(userId:number):Observable<ListResponseModel<OrderDetailDto>>{
    return this.httpClient.get<ListResponseModel<OrderDetailDto>>(this.apiUrl+"orderdetails/getalldetailsbyuserid?userId="+userId)
  }
}
