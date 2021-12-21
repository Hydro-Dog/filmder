import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map, withLatestFrom } from 'rxjs/operators';
import { MatchSessionStatus } from '../match-session/match-session.models';
import { UserState, UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  selectCurrentUser$ = this.select('currentUser');
  selectError$ = this.select('error');
  selectCurrentUserLoading$ = this.select('currentUserLoading');
  currentUserMatches$ = this.select('currentUserMatches');

  /**
   * Match sessions where current user is guest and not accepted
   */
  selectInvitesMatchSessions$ = this.currentUserMatches$.pipe(
    withLatestFrom(this.selectCurrentUser$),
    map(([items, currentUser]) =>
      items.filter(
        (item) =>
          currentUser.id === item.guest.id &&
          item.status === MatchSessionStatus.Pending
      )
    )
  );

  /**
   * Returns array of match sessions accepted by both participants
   */
  selectActiveMatchSessions$ = this.currentUserMatches$.pipe(
    map((items) =>
      items.filter((item) => item.status === MatchSessionStatus.Accepted)
    )
  );

  /**
   * Match session that were created by current user and not accepted
   */
  selectPendingMatchSessions$ = this.currentUserMatches$.pipe(
    withLatestFrom(this.selectCurrentUser$),
    map(([items, currentUser]) => {
      return items.filter(
        (item) =>
          item.host.id === currentUser.id &&
          item.status === MatchSessionStatus.Pending
      );
    })
  );

  /**
   * Completed match sessions
   */
  completedMatchSessions$ = this.currentUserMatches$.pipe(
    map((items) => {
      return items.filter(
        (item) => item.status === MatchSessionStatus.Completed
      );
    })
  );

  constructor(protected store: UserStore) {
    super(store);
  }
}
