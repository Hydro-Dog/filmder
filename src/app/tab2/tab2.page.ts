import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { UserFacade } from '../data-layer/user/user.facade';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  currentMatch$ = this.userFacade.selectCurrentUser$.pipe(
    map((user) => !!user.currentMatchSession)
  );

  constructor(private userFacade: UserFacade) {
    this.currentMatch$.subscribe((currentMatch) =>
      console.log('currentMatch: ', currentMatch)
    );
  }
}
