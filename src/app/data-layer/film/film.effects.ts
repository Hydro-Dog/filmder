import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { ActionType } from '@datorama/akita-ng-entity-service';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  getAvailableRegions,
  getAvailableRegionsSuccess,
} from './film.actions';
import { FilmService } from './film.service';
import { FilmStore } from './film.store';

@Injectable()
export class FilmEffects {
  type: ActionType;
  constructor(
    private actions$: Actions,
    private filmService: FilmService,
    private filmStore: FilmStore
  ) {}

  getAvailableRegions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getAvailableRegions),
        switchMap(() => {
          this.filmStore.update((state) => ({
            ...state,
            availableRegionsLoading: true,
          }));
          return this.filmService
            .getAvailableRegions()
            .pipe(map((regions) => getAvailableRegionsSuccess({ regions })));
        })
      ),
    { dispatch: true }
  );

  @Effect()
  getUserSuccess$ = this.actions$.pipe(
    ofType(getAvailableRegionsSuccess),
    tap(({ regions }) => {
      return this.filmStore.update((state) => ({
        ...state,
        userLoading: false,
        availableRegions: regions,
      }));
    })
  );
}
