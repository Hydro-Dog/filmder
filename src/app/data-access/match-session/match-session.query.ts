import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map, withLatestFrom } from 'rxjs/operators';
import { UserFacade } from '../user/user.facade';
import { MatchSessionState, MatchSessionStore } from './match-session.store';

@Injectable({ providedIn: 'root' })
export class MatchSessionQuery extends Query<MatchSessionState> {
  // TODO(vbabaev): change string selectiors to enums
  selectMatchSessions$ = this.select('matchSessions');
  selectInvitesMatchSessions$ = this.selectMatchSessions$.pipe(
    withLatestFrom(this.userFacade.selectUser$),
    map(([items, user]) =>
      items.filter(
        (item) =>
          item.guestId.toString() === user.id.toString() && !item.accepted
      )
    )
  );

  selectCurrentMatchSessions$ = this.selectMatchSessions$.pipe(
    withLatestFrom(this.userFacade.selectUser$),
    map(([items, user]) =>
      items.filter(
        (item) =>
          item.hostId.toString() === user.id.toString() ||
          item.guestId.toString() === user.id.toString()
      )
    )
  );
  selectError$ = this.select('error');
  selectGameModesLoading$ = this.select('matchSessionsLoading');

  constructor(
    protected store: MatchSessionStore,
    private userFacade: UserFacade
  ) {
    super(store);
  }
}
