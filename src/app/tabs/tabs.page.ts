import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  readonly selectInvitesMatchSessions$ =
    this.matchSessionFacade.selectInvitesMatchSessions$;

  constructor(
    private router: Router,
    private matchSessionFacade: MatchSessionFacade
  ) {}

  getSegmentValue() {
    if (this.router.url.includes('tab1')) return 'tab1';
    if (this.router.url.includes('tab2')) return 'tab2';
    if (this.router.url.includes('tab3')) return 'tab3';
  }
}
