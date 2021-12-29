import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {
  CreateMatchSessionDTO,
  MatchSession,
  MatchSessionCO,
  MatchSessionEntity,
  MatchSessionSocketEvents,
  SwipeMatchSessionStatusDTO,
  UpdateMatchSessionStatusDTO,
} from './match-session.models';
import { GameModes } from '../game-mode/game-mode.models';
// import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class MatchSessionService {
  constructor(
    private http: HttpClient // private socket: Socket
  ) {}

  // listenForServer$: Observable<any> = this.socket.fromEvent(
  //   MatchSessionSocketEvents.ServerMessage
  // );

  // msgToServer(event: string, message: any) {
  //   this.socket.emit(event, message);
  // }

  create(matchSession: CreateMatchSessionDTO): Observable<MatchSession> {
    return this.http.post<MatchSession>(
      `${environment.apiUrl}/api/matchsession`,
      matchSession
    );
  }

  updateStatus(
    data: UpdateMatchSessionStatusDTO
  ): Observable<MatchSessionEntity> {
    return this.http.post<MatchSessionEntity>(
      `${environment.apiUrl}/api/matchsession/status`,
      data
    );
  }

  getGameModes(): Observable<GameModes[]> {
    return this.http.get<GameModes[]>(`${environment.apiUrl}/api/gamemode`);
  }

  loadMatchSession(matchSessionId: string): Observable<MatchSessionEntity> {
    const params = new HttpParams({
      fromObject: {
        matchSessionId,
      },
    });

    return this.http.get<MatchSessionEntity>(
      `${environment.apiUrl}/api/matchsession`,
      { params }
    );
  }

  swipe(data: SwipeMatchSessionStatusDTO): Observable<MatchSessionEntity> {
    return this.http.post<MatchSessionEntity>(
      `${environment.apiUrl}/api/matchsession/swipe`,
      data
    );
  }

  // update(matchSession: MatchSession): Observable<MatchSession> {
  //   return this.http.put<MatchSession>(
  //     `${environment.apiUrl}/api/matchsession/${matchSession.id}`,
  //     matchSession
  //   );
  // }

  // delete(matchSessionId: number): Observable<number> {
  //   return this.http.request<number>(
  //     'delete',
  //     `${environment.apiUrl}/api/matchsession`,
  //     { body: { matchSessionId } }
  //   );

  //   // return this.http.delete<number>(`${environment.apiUrl}/api/matchsession`,  {
  //   //   body: matchSessionId,
  //   // });
  // }

  // getMatchSessionsByUserId(userId: number): Observable<MatchSession[]> {
  //   return this.http.get<MatchSession[]>(
  //     `${environment.apiUrl}/api/matchsession/?userId=${userId}`
  //   );
  // }

  // getMatchSessionById(id: string): Observable<MatchSession> {
  //   return this.http.get<MatchSession>(
  //     `${environment.apiUrl}/api/matchsession/?matchSessionId=${id}`
  //   );
  // }

  // swipe(
  //   matchSessionId: number,
  //   filmJSON: string,
  //   swipeDirection: 'left' | 'right'
  // ): Observable<MatchSession> {
  //   return this.http.post<MatchSession>(`${environment.apiUrl}/api/swipefilm`, {
  //     matchSessionId,
  //     filmJSON,
  //     swipeDirection,
  //   });
  // }
}
