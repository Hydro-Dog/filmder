import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable } from 'rxjs';
import {
  getCurrentUser,
  getCurrentUserMatchSessions,
  resetCurrentUser,
  updateCurrentUser,
} from './user.actions';
import { UserEffects } from './user.effects';
import { UserEntity } from './user.models';
import { UserQuery } from './user.query';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  readonly selectCurrentUser$ = this.userQuery.selectCurrentUser$;

  readonly selectError$ = this.userQuery.selectError$;

  readonly currentUserMatches$ = this.userQuery.currentUserMatches$;

  readonly selectInvitesMatchSessions$ =
    this.userQuery.selectInvitesMatchSessions$;

  readonly selectActiveMatchSessions$ =
    this.userQuery.selectActiveMatchSessions$;

  readonly selectPendingMatchSessions$ =
    this.userQuery.selectPendingMatchSessions$;

  readonly selectCompletedMatchSessions$ =
    this.userQuery.completedMatchSessions$;

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private userEffects: UserEffects,
    private actions: Actions
  ) {}

  getUser(query: Partial<UserEntity>) {
    return this.userService.getUser(query);
  }

  loadCurrentUser() {
    this.actions.dispatch(getCurrentUser());

    return this.userEffects.getCurrentUserSuccess$;
  }

  updateCurrentUser(user: Partial<UserEntity>) {
    this.actions.dispatch(updateCurrentUser({ user }));

    return this.userEffects.updateCurrentUserSuccess$;
  }

  resetCurrentUser() {
    this.actions.dispatch(resetCurrentUser());
  }

  loadCurrentUserMatchSessions() {
    this.actions.dispatch(getCurrentUserMatchSessions());

    return this.userEffects.getCurrentUserMatchSessionsSuccess$;
  }

  // getUser(userId: ID) {
  //   this.actions.dispatch(getUser({ userId }));

  //   return this.userEffects.getUserSuccess$;
  // }

  // updateUser(user: Partial<User>) {
  //   this.actions.dispatch(updateUser({ user }));
  // }

  //  getUser(value: string) {
  //   return this.userService.checkUserNameIsTaken(value);
  // }

  // checkEmailIsTaken(value: string) {
  //   return this.userService.checkEmailIsTaken(value);
  // }

  // getByUsername(value: string) {
  //   return this.userService.getByUsername(value).pipe(
  //     map((val) => {
  //       return val.user;
  //     })
  //   );
  // }

  // checkUserNameIsTaken(value: string) {
  //   return this.userService.checkUserNameIsTaken(value);
  // }

  // setCurrentMatchSessionSuccess(id: string) {
  //   this.actions.dispatch(setCurrentMatchSessionSuccess({ id }));

  //   return of(true).pipe(delay(500));
  // }
}
