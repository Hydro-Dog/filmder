import { createAction, props } from '@datorama/akita-ng-effects';
import { MatchSession, MatchSessionCO } from './match-session.models';

export const createMatchSession = createAction(
  '[Match Session] Create',
  props<{ matchSession: MatchSessionCO }>()
);

export const createMatchSessionSuccess = createAction(
  '[Match Session] Create Success',
  props<{
    matchSession: MatchSession;
  }>()
);

export const createMatchSessionError = createAction(
  '[Match Session] Create Error',
  props<{
    error: any;
  }>()
);
