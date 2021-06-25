import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { NumberDataResponseModel } from '../models/numberDataResponseModel';
import { ProductDetail } from '../models/productDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }
currentProduct:Product
  apiUrl = environment.baseUrl;
  add(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "products/add", product)
  }
  getIdAdd(product: Product): Observable<NumberDataResponseModel<Product>> {
    return this.httpClient.post<NumberDataResponseModel<Product>>(this.apiUrl + "products/getidadd", product)
  }
  delete(productDetail: ProductDetail): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "products/delete", productDetail)
  }
  update(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "products/update", product)
  }
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
  getProductDetailsByMinPriceAndMaxPrice(minPrice: number, maxPrice: number): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailsbyminpriceandmaxprice?minPrice=' + minPrice + "&maxPrice=" + maxPrice
    );
  }
  getProductDetailsAsc(): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailsasc'
    );
  }
  getProductDetailsEvaluation(): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'Products/getproductdetailsevaluation'
    );
  }
  getProductDetailsDesc(): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailsdesc'
    );
  }
  getProductDetailByProductName(productName: string): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailbyproductname?productName=' + productName
    );
  }

  getProductDetailByProductId(productId: number): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailbyproductid?productId=' + productId
    );
  }
  getProductDetailByBrandId(brandId: number): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + "products/getproductdetailbybrandid?brandId=" + brandId
    );
  }
  getProductDetailByCategoryId(categoryId: number): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(
      this.apiUrl + 'products/getproductdetailbycategoryId?categoryId=' + categoryId
    );
  }
  getProductByCategory(categoryId: number): Observable<ListResponseModel<Product>> {
    return this.httpClient.get<ListResponseModel<Product>>(this.apiUrl + 'products/getbycategory?categoryId=' + categoryId);
  }
  getProductLimited(limit: number): Observable<ListResponseModel<ProductDetail>> {
    return this.httpClient.get<ListResponseModel<ProductDetail>>(this.apiUrl + "products/getproductdetailslimit?limit=" + limit)
  }

  setCurrentProduct(product:Product){
    this.currentProduct = product
  }
  getCurrentProduct(){
    return this.currentProduct
  }
}
