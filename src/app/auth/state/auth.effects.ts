import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  createEffect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { UserStore } from '@src/app/data-layer/user/user.store';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { STORAGE_ITEMS, StorageFacade } from '../../services/storage.service';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logoutSuccess,
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
    private storageFacade: StorageFacade
  ) {}

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        switchMap(() => {
          return this.authService.logout().pipe(map(() => logoutSuccess()));
        })
      ),
    { dispatch: true }
  );

  @Effect()
  logoutSuccess$ = this.actions$.pipe(
    ofType(logoutSuccess),
    tap(() => {
      this.storageFacade.clearStorage();

      return this.userStore.update((state) => ({
        ...state,
        user: null,
      }));
    })
  );

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

          return this.authService.login(userName, password).pipe(
            map((user) => loginSuccess({ user })),
            catchError((error) => of(loginError({ error })))
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
      this.storageFacade.setItem({
        key: STORAGE_ITEMS.USER_ID,
        value: user.id,
      });
      this.storageFacade.setItem({
        key: STORAGE_ITEMS.ACCESS_TOKEN_KEY,
        value: user.accessToken,
      });
      this.storageFacade.setItem({
        key: STORAGE_ITEMS.REFRESH_TOKEN_KEY,
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
      this.authStore.update((state) => ({
        ...state,
        loginError: error,
        userLoading: false,
      }));
    })
  );
}
