import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import {
  MatchSession,
  MatchSessionSocketEvents,
} from '../data-layer/match-session/match-session.models';
import { MatchSessionService } from '../data-layer/match-session/match-session.service';
import { UserFacade } from '../data-layer/user/user.facade';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/matches-list/matches-list.component';

@Component({
  templateUrl: 'matches-invites.component.html',
})
export class MatchesInvitesComponent implements OnInit, OnDestroy {
  readonly matchSessionsListTypes = MatchSessionsListTypes;
  readonly selectGuestedMatchSessions$ =
    this.matchSessionFacade.selectInvitesMatchSessions$;

  readonly destroy$ = new Subject();

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private userFacade: UserFacade,
    private storageFacade: StorageFacade,
    private navController: NavController
  ) {}

  async ngOnInit() {
    // this.selectGuestedMatchSessions$.subscribe((selectGuestedMatchSessions) =>
    //   console.log('MATCHINVITES: ')
    // );
    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id);
    // this.matchSessionFacade.registerNewListener(id);
    // this.matchSessionFacade.listenForNewMatches();
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  inviteAccepted(matchSession: MatchSession) {
    this.matchSessionFacade.updateMatchSession({
      ...matchSession,
      accepted: true,
    });

    this.userFacade.setCurrentMatchSessionSuccess(matchSession.id.toString());
  }

  inviteDeclined(matchSession: MatchSession) {
    this.matchSessionFacade.updateMatchSession({
      ...matchSession,
      declined: true,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
