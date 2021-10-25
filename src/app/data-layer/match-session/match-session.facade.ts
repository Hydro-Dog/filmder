import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  createMatchSession,
  deleteMatchSession,
  getCurrentMatchSession,
  getMatchSessionsByUserId,
  socketAddMatchSessionSuccess,
  socketChangeMatchSessionSuccess,
  swipe,
  updateMatchSession,
} from './match-session.actions';
import { MatchSessionEffects } from './match-session.effects';
import {
  MatchSession,
  MatchSessionChangesEvents,
  MatchSessionCO,
  MatchSessionSocketEvents,
} from './match-session.models';
import { MatchSessionQuery } from './match-session.query';
import { MatchSessionService } from './match-session.service';

@Injectable({ providedIn: 'root' })
export class MatchSessionFacade {
  readonly selectCurrentMatchSession$: Observable<MatchSession> =
    this.matchSessionQuery.selectCurrentMatchSession$;

  readonly selectMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectMatchSessions$;

  readonly selectInvitesMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectInvitesMatchSessions$;

  readonly selectActiveMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectActiveMatchSessions$;

  readonly selectPendingMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectPendingMatchSessions$;

  socketMatchSessionSub = new Subscription();

  constructor(
    private actions: Actions,
    private matchSessionService: MatchSessionService,
    private matchSessionQuery: MatchSessionQuery,
    private matchSessionEffects: MatchSessionEffects
  ) {}

  createMatchSession(matchSession: MatchSessionCO) {
    return this.matchSessionService.create(matchSession);
  }

  updateMatchSession(matchSession: MatchSession) {
    this.actions.dispatch(updateMatchSession({ matchSession }));
  }

  deleteMatchSession(id: string) {
    this.actions.dispatch(deleteMatchSession({ id }));
  }

  getMatchSessionsByUserId(userId: number) {
    this.actions.dispatch(getMatchSessionsByUserId({ userId }));
  }

  getCurrentMatchSession(matchSessionId: string) {
    this.actions.dispatch(getCurrentMatchSession({ matchSessionId }));
  }

  registerNewListener(id: string) {
    this.matchSessionService.msgToServer(
      MatchSessionSocketEvents.RegisterNewListener,
      { id }
    );
  }

  listenForServer() {
    this.socketMatchSessionSub.add(
      this.matchSessionService.listenForServer$.subscribe(({ message }) => {
        console.log('socket says: ', message);

        switch (message.event) {
          case MatchSessionChangesEvents.Add:
            this.actions.dispatch(
              socketAddMatchSessionSuccess({
                matchSession: message.message,
              })
            );

            break;
          case MatchSessionChangesEvents.ChangeStatus:
            this.actions.dispatch(
              socketChangeMatchSessionSuccess({
                matchSession: message.message,
              })
            );
            break;

          default:
            break;
        }
      })
    );
  }

  stopListenForNewMatches() {
    this.socketMatchSessionSub.unsubscribe();
  }

  swipe(
    matchSessionId: number,
    filmId: number,
    swipeDirection: 'left' | 'right'
  ) {
    this.actions.dispatch(swipe({ matchSessionId, filmId, swipeDirection }));
  }
}
