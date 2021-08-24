import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  selectIsLogin$ = this.select('token');
  selectLoginError$ = this.select('loginError');
  selectIdLoading$ = this.select('idLoading');
  selectUserLoading$ = this.select('userLoading');

  constructor(protected store: AuthStore) {
    super(store);
  }
}
