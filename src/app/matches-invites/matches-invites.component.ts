import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSessionsListTypes } from '../shared/components/matches-list/matches-list.component';

@Component({
  templateUrl: 'matches-invites.component.html',
})
export class MatchesInvitesComponent {
  readonly matchSessionsListTypes = MatchSessionsListTypes;
  readonly selectGuestedMatchSessions$ =
    this.matchSessionFacade.selectGuestedMatchSessions$;

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private navController: NavController
  ) {
    this.selectGuestedMatchSessions$.subscribe((x) => console.log('x: ', x));
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }
}
