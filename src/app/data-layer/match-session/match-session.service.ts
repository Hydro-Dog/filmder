import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {
  MatchSession,
  MatchSessionCO,
  MatchSessionSocketEvents,
} from './match-session.models';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class MatchSessionService {
  constructor(private http: HttpClient, private socket: Socket) {}

  getPushedNewMatchSession$ = this.socket.fromEvent<string>(
    MatchSessionSocketEvents.PushNewMatchSession
  );

  create(matchSession: MatchSessionCO): Observable<MatchSession> {
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
