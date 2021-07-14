import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { AuthStore } from './auth.store';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from './auth.models';
import { ApiResponse } from '@src/app/shared/models';
import { ID } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore, private http: HttpClient) {}

  login(userName: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/login`, {
      userName,
      password,
    });
  }

  checkUserNameIsTaken(userName: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        userName,
      },
    });
    return this.http.get(`${environment.apiUrl}/api/users/username`, {
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

  registerUser(user): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(
      `${environment.apiUrl}/register`,
      user
    );
  }
}
