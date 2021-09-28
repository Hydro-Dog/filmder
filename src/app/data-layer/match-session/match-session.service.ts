import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { MatchSession, MatchSessionCO } from './match-session.models';

@Injectable({ providedIn: 'root' })
export class MatchSessionService {
  constructor(private http: HttpClient) {}

  create(matchSession: MatchSessionCO): Observable<MatchSession> {
    console.log('send req matchSession:  ', matchSession);
    return this.http.post<MatchSession>(
      `${environment.apiUrl}/api/matchsession`,
      matchSession
    );
  }

  getMatchSessionsByUserId(userId: number): Observable<MatchSession[]> {
    return this.http.get<MatchSession[]>(
      `${environment.apiUrl}/api/matchsessions/${userId}`
    );
  }
}
