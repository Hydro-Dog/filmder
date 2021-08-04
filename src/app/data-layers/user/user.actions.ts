import { ID } from '@datorama/akita';
import { createAction, props } from '@datorama/akita-ng-effects';
import { UserRO } from './user.models';

export const getUser = createAction('[User] Get User', props<{ userId: ID }>());

export const getUserSuccess = createAction(
  '[User] Get User Success',
  props<{
    user: UserRO;
  }>()
);

export const getUserError = createAction(
  '[User] Get User Error',
  props<{
    error: any;
  }>()
);
