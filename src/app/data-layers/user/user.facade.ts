import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable } from 'rxjs';
import { getUser, updateUser } from './user.actions';
import { User } from './user.models';
import { UserQuery } from './user.query';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  selectUser$: Observable<User>;
  selectId$: Observable<number>;
  selectError$: Observable<any>;

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private actions: Actions
  ) {
    this.selectUser$ = this.userQuery.selectUser$;
    this.selectError$ = this.userQuery.selectError$;
  }

  getUser(userId: ID) {
    this.actions.dispatch(getUser({ userId }));
  }

  updateUser(user: Partial<User>) {
    this.actions.dispatch(updateUser({ user }));
  }
}
