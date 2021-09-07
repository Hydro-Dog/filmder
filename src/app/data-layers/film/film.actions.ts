import { createAction, props } from '@datorama/akita-ng-effects';
import { Region } from './film.models';

export const getAvailableRegions = createAction('[Film] Get Available Regions');

export const getAvailableRegionsSuccess = createAction(
  '[Film] Get Available Regions Success',
  props<{
    regions: Region[];
  }>()
);

export const getAvailableRegionsError = createAction(
  '[User] Get Available Regions Error',
  props<{
    error: any;
  }>()
);
