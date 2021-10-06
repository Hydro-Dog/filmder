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
  selectInvitesMatchSessions$ = this.selectMatchSessions$.pipe(
    withLatestFrom(this.userFacade.selectUser$),
    map(([items, user]) =>
      items.filter(
        (item) =>
          item.guest.id.toString() === user.id.toString() &&
          !item.declined &&
          !item.accepted
      )
    )
  );

  /**
   * Returns array of match sessions accepted by both participants
   */
  selectAcceptedMatchSessions$ = this.selectMatchSessions$.pipe(
    map((items) => items.filter((item) => item.accepted))
  );

  /**
   * Match session that were not accepted yet or declined
   */
  selectPendingMatchSessions$ = this.selectMatchSessions$.pipe(
    withLatestFrom(this.userFacade.selectUser$),
    map(([items, user]) => {
      console.log('items: ', items);
      return items.filter(
        (item) =>
          !item.accepted &&
          !item.declined &&
          item.host.id.toString() === user.id.toString()
      );
    })
  );

  selectError$ = this.select('error');

  constructor(
    protected store: MatchSessionStore,
    private userFacade: UserFacade
  ) {
    super(store);
  }
}
