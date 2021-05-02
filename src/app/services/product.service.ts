import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ProductDetail } from '../models/productDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = environment.baseUrl;

  getProducts(): Observable<ListResponseModel<Product>> {
    return this.httpClient.get<ListResponseModel<Product>>(
      this.apiUrl + 'products/getall'
    );
  }
  getProductDetails(): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetails'
    );
  }
  getProductDetailByProductId(productId:number): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailbyproductid?productId='+productId
    );
  }
  getProductDetailByBrandId(brandId:number): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailbybrandid?brandId='+brandId
    );
  }
  getProductDetailByCategoryId(categoryId:number): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailbycategoryId?categoryId='+categoryId
    );
  }
  getProductByCategory(categoryId: number): Observable<ListResponseModel<Product>> {
    return this.httpClient.get<ListResponseModel<Product>>(this.apiUrl + 'products/getbycategory?categoryId=' + categoryId);
  }

  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl +"products/add",product)
  }
}
