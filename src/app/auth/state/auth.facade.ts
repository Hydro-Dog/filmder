import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { User } from '@src/app/data-layer/user/user.models';
import { UserQuery } from '@src/app/data-layer/user/user.query';
import { ApiError } from '@src/app/shared/models/api-error';
import { Observable } from 'rxjs';
import { login, register } from './auth.actions';
import { AuthQuery } from './auth.query';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  selectIsLogin$: Observable<string>;
  selectUser$: Observable<User>;
  selectId$: Observable<number>;
  selectError$: Observable<any>;

  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private userQuery: UserQuery,
    private actions: Actions
  ) {
    this.selectIsLogin$ = this.authQuery.selectIsLogin$;
    this.selectError$ = this.userQuery.selectError$;
  }

  login(userName: string, password: string) {
    this.actions.dispatch(login({ userName, password }));
  }

  register(user: User) {
    this.actions.dispatch(register({ user }));
  }

  // checkEmailIsTaken(value: string) {
  //   return this.authService.checkEmailIsTaken(value);
  // }

  // getByUsername(value: string) {
  //   return this.authService.getByUsername(value);
  // }

  // checkUserNameIsTaken(value: string) {
  //   return this.authService.checkUserNameIsTaken(value);
  // }

  // checkPhoneNumberIsTaken(value: string) {
  //   return this.authService.checkPhoneNumberIsTaken(value);
  // }
}
