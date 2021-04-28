import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { CustomerAddress } from '../models/customerAddress';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  apiUrl = environment.baseUrl;
  constructor(private httpClient:HttpClient,
              private authService:AuthService) { }
  
    saveCreditCard(address:Address):Observable<ResponseModel>{
      let customerCreditCard:CustomerAddress = {customerId:this.authService.currentUserId,addressId:address.id}
      let newPath = this.apiUrl +"customeraddress/add"
      return this.httpClient.post<ResponseModel>(newPath,customerCreditCard)
    }
    getByCustomerId(customerId:number):Observable<ListResponseModel<CustomerAddress>>{
      let newPath = this.apiUrl + "customeraddress/getbycustomerid?customerId="+customerId
      return this.httpClient.get<ListResponseModel<CustomerAddress>>(newPath)
    }
}