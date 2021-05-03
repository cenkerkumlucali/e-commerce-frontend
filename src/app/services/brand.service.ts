import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { BrandDetail } from '../models/brandDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient
      .get<ListResponseModel<Brand>>(this.apiUrl + 'brands/getall');
  }
  getBrandsDetail():Observable<ListResponseModel<BrandDetail>> {
    return this.httpClient.get<ListResponseModel<BrandDetail>>(this.apiUrl+"brands/getbrandsdetail")
  }
}
