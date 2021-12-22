import { Component } from '@angular/core';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  // readonly currentMatchSession$ =
  //   this.matchSessionFacade.selectCurrentMatchSession$;

  constructor(private matchSessionFacade: MatchSessionFacade) {}
}
