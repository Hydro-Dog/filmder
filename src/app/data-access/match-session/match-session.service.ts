import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {
  MatchSession,
  MatchSessionCO,
  ScopeSearchMatchSession,
} from './match-session.models';

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

  search(
    userId: number,
    scope: ScopeSearchMatchSession
  ): Observable<MatchSession[]> {
    return this.http.get<MatchSession[]>(
      `${environment.apiUrl}/api/matchsession/${userId}?scope=${scope}`
    );
  }
}
