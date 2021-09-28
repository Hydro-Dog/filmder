import { createAction, props } from '@datorama/akita-ng-effects';
import { User, UserRO } from '@src/app/data-layer/user/user.models';

export const login = createAction(
  '[Auth] Login',
  props<{ userName: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    user: UserRO;
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
  props<{ user: User }>()
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
