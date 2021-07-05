import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

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
}
