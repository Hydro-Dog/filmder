import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { UserFacade } from '../data-layer/user/user.facade';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  // readonly selectInvitesMatchSessions$ =
  //   this.matchSessionFacade.selectInvitesMatchSessions$;

  constructor(private router: Router, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userFacade.getCurrentUser();
  }

  getSegmentValue() {
    if (this.router.url.includes('tab1')) return 'tab1';
    if (this.router.url.includes('tab2')) return 'tab2';
    if (this.router.url.includes('tab3')) return 'tab3';
  }
}
