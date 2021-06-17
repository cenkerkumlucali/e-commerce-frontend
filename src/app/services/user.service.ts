import { UserUpdateDto } from './../models/userUpdateDto';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { UserDetail } from '../models/userDetail';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = environment.baseUrl;
  getByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + "users/email?email=" + email)
  }
  getUsersDetails(): Observable<ListResponseModel<UserDetail>> {
    return this.httpClient.get<ListResponseModel<UserDetail>>(this.apiUrl + "users/getusersdetails")
  }
  getUserDetailsById(userId: number): Observable<ListResponseModel<UserDetail>> {
    return this.httpClient.get<ListResponseModel<UserDetail>>(this.apiUrl + "users/getbyusersdetailsbyid?userId=" + userId)
  }
  profileUpdate(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'users/updateprofile', {
      user: {
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'status': user.status
      },
      password: user.password
    });
  }
  getByUserId(userId: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"users/getbyuserid?userId="+userId)
  }
  passwordEdit(userUpdateDto: UserUpdateDto, newPassword: string, newPasswordVerify: string): Observable<ResponseModel> {
    let newPath = this.apiUrl + "users/editpassword?newPassword="+newPassword+"&newPasswordVerify="+newPasswordVerify 
    return this.httpClient.post<ResponseModel>(newPath,userUpdateDto)
  }
}