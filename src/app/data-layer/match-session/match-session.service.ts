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

  listenForMatchSessionsChanges$: Observable<any> = this.socket.fromEvent(
    MatchSessionSocketEvents.MatchSessionChanges
  );

  msgToServer(event: string, message: any) {
    this.socket.emit(event, message);
  }

  create(matchSession: MatchSessionCO): Observable<MatchSession> {
    return this.http.post<MatchSession>(
      `${environment.apiUrl}/api/matchsession`,
      matchSession
    );
  }

  update(matchSession: MatchSession): Observable<MatchSession> {
    return this.http.put<MatchSession>(
      `${environment.apiUrl}/api/matchsession/${matchSession.id}`,
      matchSession
    );
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(
      `${environment.apiUrl}/api/matchsession/${id}`
    );
  }

  getMatchSessionsByUserId(userId: number): Observable<MatchSession[]> {
    return this.http.get<MatchSession[]>(
      `${environment.apiUrl}/api/matchsession/?userId=${userId}`
    );
  }

  getMatchSessionById(id: string): Observable<MatchSession> {
    return this.http.get<MatchSession>(
      `${environment.apiUrl}/api/matchsession/?matchSessionId=${id}`
    );
  }
}
