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
  socketGetMessageSuccess,
  swipe,
  updateMatchSession,
} from './match-session.actions';
import { MatchSessionEffects } from './match-session.effects';
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

  socketMatchSessionSub = new Subscription();

  constructor(
    private actions: Actions,
    private matchSessionService: MatchSessionService,
    private matchSessionQuery: MatchSessionQuery,
    private matchSessionEffects: MatchSessionEffects
  ) {}

  getCreateResult() {
    return this.matchSessionEffects.createMatchSession$;
  }

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

  listenForServer() {
    console.log('listenForServer');
    this.socketMatchSessionSub.add(
      this.matchSessionService.listenForServer$.subscribe(({ message }) => {
        console.log('socket says: ', message);
        // this.actions.dispatch(
        //   socketGetMessageSuccess({
        //     message,
        //     event: message.event,
        //   })
        // );
      })
    );
  }

  listenForMatchSessionsChanges() {
    this.socketMatchSessionSub.add(
      this.matchSessionService.listenForMatchSessionsChanges$.subscribe(
        ({ message }) => {
          console.log('message: ', message);
          this.actions.dispatch(
            socketGetMatchSessionSuccess({
              matchSession: message.matchSession,
              event: message.event,
            })
          );
        }
      )
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
