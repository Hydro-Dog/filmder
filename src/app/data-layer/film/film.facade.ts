import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { getAvailableRegions } from './film.actions';
import { FilmQuery } from './film.query';

@Injectable({ providedIn: 'root' })
export class FilmFacade {
  selectAvailableRegions$ = this.filmQuery.selectAvailableRegions$;
  selectError$ = this.filmQuery.selectError$;
  selectAvailableRegionsLoading$ =
    this.filmQuery.selectAvailableRegionsLoading$;

  constructor(private filmQuery: FilmQuery, private actions: Actions) {}

  getAvailableRegions() {
    this.actions.dispatch(getAvailableRegions());
  }
}
