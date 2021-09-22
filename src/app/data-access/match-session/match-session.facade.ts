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
  selectInvitesMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectInvitesMatchSessions$;
  selectCurrentMatchSessions$: Observable<MatchSession[]> =
    this.matchSessionQuery.selectCurrentMatchSessions$;

  constructor(
    private actions: Actions,
    private matchSessionQuery: MatchSessionQuery
  ) {}

  createMatchSession(matchSession: MatchSessionCO) {
    console.log('matchSession: ', matchSession);
    this.actions.dispatch(createMatchSession({ matchSession }));
  }

  // /**
  //  * Returns array of match session basing on the passed 'scope' value
  //  * @param userId - id of host or guest match session participant.
  //  * @param scope - scope that is used as filter for search.
  //  */
  // searchMatchSessions(userId: number, scope: ScopeSearchMatchSession) {
  //   this.actions.dispatch(searchMatchSessions({ userId, scope }));
  // }

  /**
   * Returns array of match session where user is host or guest.
   * @param userId
   */
  getMatchSessionsByUserId(userId: number) {
    this.actions.dispatch(getMatchSessionsByUserId({ userId }));
  }
}
