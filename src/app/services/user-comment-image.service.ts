import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResponseModel} from '../models/responseModel';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCommentImageService {

  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  add(image: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'UserCommentImages/add', image);
  }

}
