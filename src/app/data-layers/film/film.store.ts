import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Region } from './film.models';

export interface FilmState {
  availableRegions: Region[];
  availableRegionsLoading: boolean;
  error: any;
}

export function createInitialState(): FilmState {
  return {
    availableRegions: [],
    availableRegionsLoading: false,
    error: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'film' })
export class FilmStore extends Store<FilmState> {
  constructor() {
    super(createInitialState());
  }
}
