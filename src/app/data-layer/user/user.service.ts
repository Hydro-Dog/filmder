import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
// import { User, UserRO } from './user.models';
import { ID } from '@datorama/akita';
import { UserEntity } from './user.models';
import {
  GetMatchSessionDTO,
  MatchSessionEntity,
} from '../match-session/match-session.models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  // getUser(id: ID): Observable<UserRO> {
  //   const params = new HttpParams({
  //     fromObject: {
  //       id,
  //     },
  //   });
  //   return this.http.get<UserRO>(`${environment.apiUrl}/api/users/userId`, {
  //     params,
  //   });
  // }

  // checkUserNameIsTaken(userName: string): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/api/users/checkUserName`, {
  //     userName,
  //   });
  // }

  getCurrentUser(): Observable<UserEntity> {
    console.log('getCurrentUser api');
    return this.http.get<UserEntity>(
      `${environment.apiUrl}/api/currentuserprofile`
    );
  }

  updateCurrentUser(payload: Partial<UserEntity>): Observable<UserEntity> {
    return this.http.put<UserEntity>(
      `${environment.apiUrl}/api/currentuserprofile`,
      payload
    );
  }

  getUser(query: Partial<UserEntity>) {
    let params = new HttpParams({ fromObject: query });

    return this.http.get(`${environment.apiUrl}/api/user`, { params });
  }

  getCurrentUserMatchSessions(): Observable<MatchSessionEntity[]> {
    return this.http.get<MatchSessionEntity[]>(
      `${environment.apiUrl}/api/usermatchsessions`
    );
  }

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
}
