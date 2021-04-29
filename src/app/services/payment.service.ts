import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
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
    let newPath = this.apiUrl + "fakecards/iscardexist"
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<Payment>>{
    let newPath = this.apiUrl + "fakecards/getbycardnumber?cardnumber=" + cardNumber
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }
getCardById(id:number):Observable<SingleResponseModel<Payment>>{
  let newPath = this.apiUrl +"fakecards/getbyid?id="+id
  return this.httpClient.get<SingleResponseModel<Payment>>(newPath)
}
updateCard(payment:Payment):Observable<ResponseModel>{
  let newPath = this.apiUrl + "fakecards/update"
  return this.httpClient.post<ResponseModel>(newPath,payment)
}


}