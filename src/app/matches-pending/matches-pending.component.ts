import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSessionsListTypes } from '../shared/components/matches-list/matches-list.component';

@Component({
  templateUrl: 'matches-pending.component.html',
})
export class MatchesPendingComponent {
  readonly matchSessionsListTypes = MatchSessionsListTypes;
  readonly selectPendingMatchSessions$ =
    this.matchSessionFacade.selectPendingMatchSessions$;

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private navController: NavController
  ) {}

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }
}
