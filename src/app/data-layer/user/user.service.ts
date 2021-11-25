import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { User, UserRO } from './user.models';
import { ID } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: ID): Observable<UserRO> {
    const params = new HttpParams({
      fromObject: {
        id,
      },
    });
    return this.http.get<UserRO>(`${environment.apiUrl}/api/users/userId`, {
      params,
    });
  }

  updateUser(payload: Partial<User>): Observable<UserRO> {
    return this.http.put<UserRO>(`${environment.apiUrl}/api/users`, payload);
  }

  checkUserNameIsTaken(userName: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/users/checkUserName`, {
      userName,
    });
  }

  getByUsername(userName: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        userName,
      },
    });

    return this.http.get(`${environment.apiUrl}/api/users/userName`, {
      params,
    });
  }

  checkEmailIsTaken(email: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        email,
      },
    });
    return this.http.get(`${environment.apiUrl}/api/users/email`, {
      params,
    });
  }
}
