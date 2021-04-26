import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = environment.baseUrl;
getByEmail(email:string):Observable<User>{
  return this.httpClient.get<User>(this.apiUrl+"/users/email?email="+email)
}

profileUpdate(user:User):Observable<ResponseModel>{
  console.log(user)
  return this.httpClient.post<ResponseModel>(this.apiUrl + '/users/updateprofile', {
    user:{
      'id': user.id,
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'status':user.status
    },
    password:user.password
  });
}
}