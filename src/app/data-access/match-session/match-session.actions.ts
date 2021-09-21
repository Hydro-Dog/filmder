import { createAction, props } from '@datorama/akita-ng-effects';
import {
  MatchSession,
  MatchSessionCO,
  ScopeSearchMatchSession,
} from './match-session.models';

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

export const searchMatchSessions = createAction(
  '[Match Session] Search',
  props<{ userId: number; scope: ScopeSearchMatchSession }>()
);

export const searchMatchSessionsHostedSuccess = createAction(
  '[Match Session] Search Hosted Success',
  props<{
    matchSessions: MatchSession[];
  }>()
);

export const searchMatchSessionsHostedError = createAction(
  '[Match Session] Search Hosted Error',
  props<{
    error: any;
  }>()
);

export const searchMatchSessionsInvitedSuccess = createAction(
  '[Match Session] Search Invited Success',
  props<{
    matchSessions: MatchSession[];
  }>()
);

export const searchMatchSessionsInvitedError = createAction(
  '[Match Session] Search Invited Error',
  props<{
    error: any;
  }>()
);
