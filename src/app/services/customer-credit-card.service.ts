import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerCreditCard } from '../models/customerCard';
import { CustomerCreditCardDetails } from '../models/customerCreditCardDetails';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerCreditCardService {
  apiUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient,
    private authService: AuthService) { }

  addCustomerCreditCard(customerCreditCard: CustomerCreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "customercreditcard/add",customerCreditCard)
  }
  deleteCustomerCreditCard(customerCreditCard: CustomerCreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "customercreditcard/delete", customerCreditCard)
  }
  getDetailByCustomerId(customerId: number): Observable<ListResponseModel<CustomerCreditCardDetails>> {
    return this.httpClient.get<ListResponseModel<CustomerCreditCardDetails>>(this.apiUrl + "customercreditcard/getdetailsbycustomerid?customerId=" + customerId)
  }
  getByCustomerId(customerId: number): Observable<ListResponseModel<CustomerCreditCard>> {
    let newPath = this.apiUrl + "customercreditcard/getbycustomerid?customerId=" + customerId
    return this.httpClient.get<ListResponseModel<CustomerCreditCard>>(newPath)
  } 

  saveCreditCard(payment: Payment): Observable<ResponseModel> {
    let customerCreditCard: CustomerCreditCard = { customerId: this.authService.currentUserId, cardId: payment.id }
    let newPath = this.apiUrl + "customercreditcard/add"
    return this.httpClient.post<ResponseModel>(newPath, customerCreditCard)
  }
}