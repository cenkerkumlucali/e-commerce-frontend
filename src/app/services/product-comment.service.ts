import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductComment } from '../models/productComment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductCommentService {
apiUrl=environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  add(productComment:ProductComment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"productcomment/add",productComment)
  }
}
