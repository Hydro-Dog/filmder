import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { UserEntity } from '@src/app/data-layer/user/user.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  logout() {
    return this.http.post<UserEntity>(`${environment.apiUrl}/logout`, {});
  }

  login(email: string, password: string): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${environment.apiUrl}/login`, {
      email,
      password,
    });
  }

  refresh(refreshToken: string, headers: HttpHeaders): Observable<UserEntity> {
    return this.http.post<UserEntity>(
      `${environment.apiUrl}/refresh`,
      {
        refreshToken,
      },
      { headers }
    );
  }

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
