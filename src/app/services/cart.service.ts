import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {BasketDetails} from '../models/basketDetail';
import {Cart} from '../models/cart';
import {ListResponseModel} from '../models/listResponseModel';
import {ResponseModel} from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  add(cart: Cart): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'baskets/add', cart);
  }

  delete(cart: Cart): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'baskets/delete', cart);
  }

  get(): Observable<ListResponseModel<Cart>> {
    return this.httpClient.get<ListResponseModel<Cart>>(this.apiUrl + 'baskets/getall');
  }

  getDetailsUserId(userId: number): Observable<ListResponseModel<BasketDetails>> {
    return this.httpClient.get<ListResponseModel<BasketDetails>>(this.apiUrl + 'baskets/getbasketdetailsbyuserid?userId=' + userId);
  }
}
