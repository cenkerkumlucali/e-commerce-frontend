import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserComment } from '../models/userComment';

@Injectable({
  providedIn: 'root'
})
export class UserCommentService {
  apiUrl=environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  get():Observable<ListResponseModel<UserComment>>{
    return this.httpClient.get<ListResponseModel<UserComment>>(this.apiUrl+"usercomment/getall")
  }
  add(userComment:UserComment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"usercomment/add",userComment)
  }
  update(userComment:UserComment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"usercomment/update",userComment)
  }

}