import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  createEffect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { UserStore } from '@src/app/data-access/user/user.store';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  StorageService,
  USER_ID,
} from '../../services/storage.service';
import {
  login,
  loginError,
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
    private authStore: AuthStore,
    private userStore: UserStore,
    private storageService: StorageService
  ) {}

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(register),
        switchMap(({ user }) => {
          this.authStore.update((state) => ({
            ...state,
            idLoading: true,
          }));

          return this.authService
            .registerUser(user)
            .pipe(map((id) => registerSuccess(id)));
        })
      ),
    { dispatch: true }
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        switchMap(({ userName, password }) => {
          this.authStore.update((state) => ({
            ...state,
            userLoading: true,
          }));

          console.log('ofType(login)');

          return this.authService.login(userName, password).pipe(
            map((user) => loginSuccess({ user })),
            catchError((error) => of(loginError({ error })))
            // catchError((error) => {
            //   loginError({ error });
            //   this.authStore.update((state) => ({
            //     ...state,
            //     loginError: error,
            //     userLoading: false,
            //   }));
            //   return of(error);
            // })
          );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  registerSuccess$ = this.actions$.pipe(
    ofType(registerSuccess),
    map((x) => x.id),
    tap((id) => {
      return this.authStore.update((state) => ({
        ...state,
        id,
        idLoading: false,
      }));
    })
  );

  @Effect()
  registerError$ = this.actions$.pipe(
    ofType(registerError),
    tap((error) => this.authStore.update((state) => ({ ...state, error })))
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(loginSuccess),
    tap(({ user }) => {
      console.log('    ofType(loginSuccess)');
      this.storageService.setValue({ key: USER_ID, value: user.id });
      this.storageService.setValue({
        key: ACCESS_TOKEN_KEY,
        value: user.accessToken,
      });
      this.storageService.setValue({
        key: REFRESH_TOKEN_KEY,
        value: user.refreshToken,
      });
    }),
    map((x) => x.user),
    tap((user) =>
      this.userStore.update((state) => {
        return {
          ...state,
          user,
          userLoading: false,
        };
      })
    )
  );

  @Effect()
  loginError$ = this.actions$.pipe(
    ofType(loginError),
    tap((error) => {
      console.log('ofType(loginError)');
      this.authStore.update((state) => ({
        ...state,
        loginError: error,
        userLoading: false,
      }));
    })
  );
}
