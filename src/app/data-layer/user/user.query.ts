import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserState, UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  selectUser$ = this.select('currentUser');
  selectError$ = this.select('error');
  selectUserLoading$ = this.select('currentUserLoading');

  constructor(protected store: UserStore) {
    super(store);
  }
}
