import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { User } from '@src/app/data-layer/user/user.models';
import { UserQuery } from '@src/app/data-layer/user/user.query';
import { ApiError } from '@src/app/shared/models/api-error';
import { Observable } from 'rxjs';
import { login, logout, register } from './auth.actions';
import { AuthQuery } from './auth.query';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  readonly selectIsLogin$: Observable<string>;
  readonly selectUser$: Observable<User>;
  readonly selectId$: Observable<number>;
  readonly selectError$: Observable<any>;

  constructor(
    private authQuery: AuthQuery,
    private userQuery: UserQuery,
    private actions: Actions
  ) {
    this.selectIsLogin$ = this.authQuery.selectIsLogin$;
    this.selectError$ = this.userQuery.selectError$;
  }

  logout() {
    this.actions.dispatch(logout());
  }

  login(userName: string, password: string) {
    this.actions.dispatch(login({ userName, password }));
  }

  register(user: User) {
    this.actions.dispatch(register({ user }));
  }
}
