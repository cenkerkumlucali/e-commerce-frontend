import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { NumberDataResponseModel } from '../models/numberDataResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private httpClient: HttpClient) { }

  apiUrl = environment.baseUrl;

  isCardExist(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "payments/iscardexist"
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<Payment>>{
    let newPath = this.apiUrl + 'payments/getbycardnumber?cardnumber=' + cardNumber
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }

  getCardById(id:number):Observable<SingleResponseModel<Payment>>{
  let newPath = this.apiUrl + 'payments/getbyid?id='+id
  return this.httpClient.get<SingleResponseModel<Payment>>(newPath)
  }

  updateCard(payment:Payment):Observable<ResponseModel>{
  let newPath = this.apiUrl + "payments/update"
  return this.httpClient.post<ResponseModel>(newPath,payment)
  }
  addCard(payment:Payment):Observable<NumberDataResponseModel<Payment>>{
    let newPath = this.apiUrl + "payments/add"
    return this.httpClient.post<NumberDataResponseModel<Payment>>(newPath,payment)
    }

}
