import {ResponseModel} from './../models/responseModel';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {UserImage} from '../models/userImage';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  add(image: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'userimages/add', image);
  }

  delete(image: UserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'userimages/delete', image);
  }

  update(image: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'userimages/update', image);
  }
}
