import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Address} from '../models/address';
import {ListResponseModel} from '../models/listResponseModel';
import {ResponseModel} from '../models/responseModel';
import {SingleResponseModel} from '../models/singleResponseModel';
import {NumberDataResponseModel} from '../models/numberDataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  currentAddress: Address;
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  add(address: Address): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'addresses/add', address);
  }

  getIdAdd(address: Address): Observable<NumberDataResponseModel<Address>> {
    return this.httpClient.post<NumberDataResponseModel<Address>>(this.apiUrl + 'addresses/add', address);
  }

  update(address: Address): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'addresses/update', address);
  }

  delete(address: Address): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'addresses/delete', address);
  }

  get(): Observable<ListResponseModel<Address>> {
    return this.httpClient.get<ListResponseModel<Address>>(this.apiUrl + 'addresses/getall');
  }

  getAddressById(id: number): Observable<SingleResponseModel<Address>> {
    let newPath = this.apiUrl + 'addresses/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Address>>(newPath);
  }

  getAdressByUserId(userId: number): Observable<ListResponseModel<Address>> {
    return this.httpClient.get<ListResponseModel<Address>>(this.apiUrl + 'addresses/getallbyuserid?userId=' + userId);
  }

  setCurrentAddress(address: Address) {
    this.currentAddress = address;
  }

  getCurrentAddress() {
    return this.currentAddress;
  }
}
