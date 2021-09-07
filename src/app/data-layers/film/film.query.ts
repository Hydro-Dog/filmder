import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FilmState, FilmStore } from './film.store';

@Injectable({ providedIn: 'root' })
export class FilmQuery extends Query<FilmState> {
  selectAvailableRegions$ = this.select('availableRegions');
  selectError$ = this.select('error');
  selectAvailableRegionsLoading$ = this.select('availableRegionsLoading');

  constructor(protected store: FilmStore) {
    super(store);
  }
}
