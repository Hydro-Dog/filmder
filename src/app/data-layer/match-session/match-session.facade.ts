import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  createMatchSession,
  deleteMatchSession,
  getCurrentMatchSession,
  getMatchSessionsByUserId,
  socketGetMatchSessionSuccess,
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

  socketMatchSessionSub: Subscription;

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

  getCurrentMatchSession(matchSessionId: string) {
    this.actions.dispatch(getCurrentMatchSession({ matchSessionId }));
  }

  registerNewListener(id: string) {
    this.matchSessionService.msgToServer(
      MatchSessionSocketEvents.RegisterNewListener,
      { id }
    );
  }

  listenForMatchSessionsChanges() {
    this.socketMatchSessionSub =
      this.matchSessionService.listenForMatchSessionsChanges$.subscribe(
        ({ message }) => {
          this.actions.dispatch(
            socketGetMatchSessionSuccess({
              matchSession: message.matchSession,
              event: message.event,
            })
          );
        }
      );
  }

  stopListenForNewMatches() {
    this.socketMatchSessionSub.unsubscribe();
  }
}
