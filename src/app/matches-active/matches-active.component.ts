import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSession } from '../data-layer/match-session/match-session.models';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/matches-list/matches-list.component';

@Component({
  templateUrl: 'matches-active.component.html',
})
export class MatchesActiveComponent implements OnInit, OnDestroy {
  readonly matchSessionsListTypes = MatchSessionsListTypes;
  readonly selectActiveMatchSessions$ =
    this.matchSessionFacade.selectActiveMatchSessions$;

  readonly destroy$ = new Subject();

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private storageFacade: StorageFacade,
    private navController: NavController
  ) {}

  async ngOnInit() {
    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id);
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  matchDeclined(matchSession: MatchSession) {
    this.matchSessionFacade.updateMatchSession({
      ...matchSession,
      declined: true,
    });
  }

  continueMatch($event) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
