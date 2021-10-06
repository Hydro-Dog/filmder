import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  createMatchSession,
  deleteMatchSession,
  getMatchSessionsByUserId,
  socketPushMatchSessionSuccess,
  updateMatchSession,
} from './match-session.actions';
import {
  MatchSession,
  MatchSessionCO,
  MatchSessionSocketEvents,
} from './match-session.models';
import { MatchSessionQuery } from './match-session.query';
import { MatchSessionService } from './match-session.service';

@Injectable({ providedIn: 'root' })
export class MatchSessionFacade {
  readonly selectMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectMatchSessions$;

  readonly selectInvitesMatchSessions: Observable<MatchSession[]> =
    this.matchSessionQuery.selectInvitesMatchSessions$;

  readonly selectAcceptedMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectAcceptedMatchSessions$;

  readonly selectPendingMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectPendingMatchSessions$;

  socketMatchSessionSub: Subscription;

  // listenForNewMatchSessions$ =
  //   this.matchSessionService.listenForNewMatchSessions$.pipe(
  //     tap((matchSession) =>
  //       this.actions.dispatch(socketPushMatchSessionSuccess({matchSession}))
  //     )
  //   );

  constructor(
    private actions: Actions,
    private matchSessionService: MatchSessionService,
    private matchSessionQuery: MatchSessionQuery
  ) {}

  createMatchSession(matchSession: MatchSessionCO) {
    this.actions.dispatch(createMatchSession({ matchSession }));
  }

  updateMatchSession(matchSession: MatchSession) {
    this.actions.dispatch(updateMatchSession({ matchSession }));
  }

  deleteMatchSession(id: string) {
    this.actions.dispatch(deleteMatchSession({ id }));
  }

  /**
   * Returns array of match sessions where user is host or guest.
   * @param userId
   */
  getMatchSessionsByUserId(userId: number) {
    this.actions.dispatch(getMatchSessionsByUserId({ userId }));
  }

  registerNewListener(id: string) {
    this.matchSessionService.msgToServer(
      MatchSessionSocketEvents.RegisterNewListener,
      { id }
    );
  }

  listenForNewMatches() {
    this.socketMatchSessionSub =
      this.matchSessionService.listenForNewMatchSessions$.subscribe(
        ({ message }) => {
          this.actions.dispatch(
            socketPushMatchSessionSuccess({
              matchSession: message,
            })
          );
        }
      );
  }

  stopListenForNewMatches() {
    this.socketMatchSessionSub.unsubscribe();
  }
}
