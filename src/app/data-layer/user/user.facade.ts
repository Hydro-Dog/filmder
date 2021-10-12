import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  getUser,
  setCurrentMatchSessionSuccess,
  updateUser,
  updateUserSuccess,
} from './user.actions';
import { User } from './user.models';
import { UserQuery } from './user.query';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  selectUser$: Observable<User> = this.userQuery.selectUser$;
  selectError$: Observable<any> = this.userQuery.selectError$;

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private actions: Actions
  ) {
    // this.selectUser$ = this.userQuery.selectUser$;
    // this.selectError$ = this.userQuery.selectError$;
  }

  getUser(userId: ID) {
    this.actions.dispatch(getUser({ userId }));
  }

  updateUser(user: Partial<User>) {
    this.actions.dispatch(updateUser({ user }));
  }

  checkEmailIsTaken(value: string) {
    return this.userService.checkEmailIsTaken(value);
  }

  getByUsername(value: string) {
    return this.userService.getByUsername(value).pipe(map((val) => val.user));
  }

  checkUserNameIsTaken(value: string) {
    return this.userService.checkUserNameIsTaken(value);
  }

  checkPhoneNumberIsTaken(value: string) {
    return this.userService.checkPhoneNumberIsTaken(value);
  }

  setCurrentMatchSessionSuccess(id: string) {
    this.actions.dispatch(setCurrentMatchSessionSuccess({ id }));
  }
}
