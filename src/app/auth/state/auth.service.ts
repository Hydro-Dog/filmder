import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { UserRO } from '@src/app/data-layer/user/user.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<UserRO> {
    return this.http.post<UserRO>(`${environment.apiUrl}/login`, {
      userName,
      password,
    });
  }

  refresh(refreshToken: string, headers: HttpHeaders): Observable<UserRO> {
    return this.http.post<UserRO>(
      `${environment.apiUrl}/refresh`,
      {
        refreshToken,
      },
      { headers }
    );
  }

  // checkUserNameIsTaken(userName: string): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/api/users/checkUserName`, {
  //     userName,
  //   });
  // }

  // getByUsername(userName: string): Observable<any> {
  //   const params = new HttpParams({
  //     fromObject: {
  //       userName,
  //     },
  //   });

  //   return this.http.get(`${environment.apiUrl}/api/users/userName`, {
  //     params,
  //   });
  // }

  // checkEmailIsTaken(email: string): Observable<any> {
  //   const params = new HttpParams({
  //     fromObject: {
  //       email,
  //     },
  //   });
  //   return this.http.get(`${environment.apiUrl}/api/users/email`, {
  //     params,
  //   });
  // }

  // checkPhoneNumberIsTaken(phoneNumber: string): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/api/users/checkPhoneNumber`, {
  //     phoneNumber,
  //   });
  // }

  registerUser(user): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(
      `${environment.apiUrl}/register`,
      user
    );
  }

  mockApiRequest() {
    return this.http.get(`${environment.apiUrl}/api/users`);
  }
}
