import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map, withLatestFrom } from 'rxjs/operators';
import { UserFacade } from '../user/user.facade';
import { MatchSessionState, MatchSessionStore } from './match-session.store';

@Injectable({ providedIn: 'root' })
export class MatchSessionQuery extends Query<MatchSessionState> {
  // TODO(vbabaev): change string selectors to enums

  /**
   * Returns array of match sessions where the user is host or guest
   */
  selectMatchSessions$ = this.select('matchSessions');

  /**
   * Returns array of match sessions where the user is guest
   */
  selectGuestedMatchSessions$ = this.selectMatchSessions$.pipe(
    withLatestFrom(this.userFacade.selectUser$),
    map(([items, user]) =>
      items.filter(
        (item) =>
          item.guestId.id.toString() === user.id.toString() && !item.accepted
      )
    )
  );

  selectError$ = this.select('error');

  constructor(
    protected store: MatchSessionStore,
    private userFacade: UserFacade
  ) {
    super(store);
  }
}
