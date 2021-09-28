import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable } from 'rxjs';
import {
  createMatchSession,
  getMatchSessionsByUserId,
} from './match-session.actions';
import { MatchSession, MatchSessionCO } from './match-session.models';
import { MatchSessionQuery } from './match-session.query';

@Injectable({ providedIn: 'root' })
export class MatchSessionFacade {
  selectMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectMatchSessions$;
  selectGuestedMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectGuestedMatchSessions$;

  constructor(
    private actions: Actions,
    private matchSessionQuery: MatchSessionQuery
  ) {}

  createMatchSession(matchSession: MatchSessionCO) {
    this.actions.dispatch(createMatchSession({ matchSession }));
  }

  /**
   * Returns array of match sessions where user is host or guest.
   * @param userId
   */
  getMatchSessionsByUserId(userId: number) {
    this.actions.dispatch(getMatchSessionsByUserId({ userId }));
  }
}
