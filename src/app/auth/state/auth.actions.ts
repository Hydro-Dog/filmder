import { createAction, props } from '@datorama/akita-ng-effects';
import { UserEntity } from '@src/app/data-layer/user/user.models';

export const logout = createAction('[Auth] Log Out');

export const logoutSuccess = createAction('[Auth] Log Out Success');

export const logoutError = createAction(
  '[Auth] Log Out Error',
  props<{
    error: any;
  }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    user: UserEntity;
  }>()
);

export const loginError = createAction(
  '[Auth] Login Error',
  props<{
    error: any;
  }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ user: UserEntity }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{
    id: number;
  }>()
);

export const registerError = createAction(
  '[Auth] Register Error',
  props<{
    error: any;
  }>()
);
