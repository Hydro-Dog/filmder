import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable } from 'rxjs';
import { getAvailableRegions } from './film.actions';
import { Region } from './film.models';
import { FilmQuery } from './film.query';

@Injectable({ providedIn: 'root' })
export class FilmFacade {
  selectAvailableRegions$: Observable<Region[]>;
  selectError$: Observable<any>;
  selectAvailableRegionsLoading$: Observable<boolean>;

  constructor(private filmQuery: FilmQuery, private actions: Actions) {
    this.selectAvailableRegions$ = this.filmQuery.selectAvailableRegions$;
    this.selectError$ = this.filmQuery.selectError$;
    this.selectAvailableRegionsLoading$ =
      this.filmQuery.selectAvailableRegionsLoading$;
  }

  getAvailableRegions() {
    console.log('getAvailableRegions1');
    this.actions.dispatch(getAvailableRegions());
  }
}
