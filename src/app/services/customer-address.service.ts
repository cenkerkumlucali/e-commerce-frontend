import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Address} from '../models/address';
import {CustomerAddress} from '../models/customerAddress';
import {CustomerAddressDetail} from '../models/customerAddressDetail';
import {CustomerCreditCard} from '../models/customerCard';
import {ListResponseModel} from '../models/listResponseModel';
import {ResponseModel} from '../models/responseModel';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  addCustomerAddress(customerAddress: CustomerAddress): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'customeraddress/add';
    return this.httpClient.post<ResponseModel>(newPath, customerAddress);
  }

  deleteCustomerAddress(customerAddress: CustomerAddress): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'customeraddress/delete';
    return this.httpClient.post<ResponseModel>(newPath, customerAddress);
  }

  getByCustomerId(customerId: number): Observable<ListResponseModel<CustomerAddress>> {
    let newPath = this.apiUrl + 'customeraddress/getbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<CustomerAddress>>(newPath);
  }

  getAddressByCustomerId(customerId: number): Observable<ListResponseModel<CustomerAddressDetail>> {
    let newPath = this.apiUrl + 'customeraddress/getdetailsbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<CustomerAddressDetail>>(newPath);

  }

}
