import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  createEffect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  login,
  loginSuccess,
  register,
  registerError,
  registerSuccess,
} from './auth.actions';
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthEffects {
  type: ActionType;
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authStore: AuthStore
  ) {}
  ActionType;

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(register),
        switchMap(({ user }) =>
          this.authService
            .registerUser(user)
            .pipe(map((res) => registerSuccess({ res })))
        )
      ),
    { dispatch: true }
  );

  @Effect()
  registerSuccess$ = this.actions$.pipe(
    ofType(registerSuccess),
    tap(({ res }) => {
      return this.authStore.update((state) => ({
        ...state,
        id: res.id as unknown as number,
      }));
    })
  );

  @Effect()
  registerError$ = this.actions$.pipe(
    ofType(registerError),
    tap((error) => this.authStore.update((state) => ({ ...state, error })))
  );

  loadMainNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        switchMap(({ userName, password }) =>
          this.authService
            .login(userName, password)
            .pipe(map((user) => loginSuccess({ user })))
        )
      ),
    { dispatch: true }
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(loginSuccess),
    tap((user) => {
      //save data to localStorage
    }),
    tap((user) => this.authStore.update((state) => ({ ...state, user })))
  );
}
