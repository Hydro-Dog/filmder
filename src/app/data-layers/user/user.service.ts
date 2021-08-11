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
}
