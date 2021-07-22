import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  selectIsLogin$ = this.select('token');
  selectUser$ = this.select('user');
  selectId$ = this.select('id');
  // selectFirstName$ = this.select('firstName');
  // selectLastName$ = this.select('lastName');
  selectError$ = this.select('error');
  selectIdLoading$ = this.select('idLoading');
  selectUserLoading$ = this.select('userLoading');

  constructor(protected store: AuthStore) {
    super(store);
  }
}
