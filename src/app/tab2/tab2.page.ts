import { Component } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { UserFacade } from '../data-layer/user/user.facade';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  readonly currentMatchSession$ = this.userFacade.selectUser$.pipe(
    filter(Boolean),
    map(({ currentMatchSession }) => currentMatchSession)
  );

  readonly selectCurrentMatchSession$ =
    this.matchSessionFacade.selectCurrentMatchSession$.pipe(
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  get hasActiveMatches() {
    return this.currentMatchSession$;
  }

  constructor(
    private userFacade: UserFacade,
    private matchSessionFacade: MatchSessionFacade
  ) {
    this.selectCurrentMatchSession$.subscribe((x) => console.log('x: ', x));
  }
}
