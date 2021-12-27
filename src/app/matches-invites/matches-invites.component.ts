import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import {
  delay,
  filter,
  shareReplay,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import {
  MatchSession,
  MatchSessionEntity,
  MatchSessionStatus,
} from '../data-layer/match-session/match-session.models';
import { UserFacade } from '../data-layer/user/user.facade';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/film-matches-list/matches-list.component';
import { MatchDetailsModalActions } from '../shared/components/match-details-modal/match-details-modal.component';
import { InvitesMatchesDetailsModal } from './invites-to-matches-details/invites-to-matches-details.component';

@Component({
  templateUrl: 'matches-invites.component.html',
})
export class MatchesInvitesComponent implements OnInit, OnDestroy {
  readonly invitesMatchSessions$ = this.userFacade.selectInvitesMatchSessions$;
  readonly destroy$ = new Subject();

  constructor(
    private userFacade: UserFacade,
    private navController: NavController,
    private modalController: ModalController,
    private matchSessionFacade: MatchSessionFacade
  ) {}

  async ngOnInit() {
    this.userFacade.loadCurrentUserMatchSessions();
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  async doRefresh($event) {
    this.userFacade.loadCurrentUserMatchSessions().subscribe(() => {
      $event.target.complete();
    });
  }

  async matchClicked(matchSession: MatchSessionEntity) {
    console.log('matchClicked');

    const modal = await this.modalController.create({
      component: InvitesMatchesDetailsModal,
      swipeToClose: true,
      componentProps: {
        host: matchSession.host?.username,
        guest: matchSession.guest?.username,
        category: matchSession.category,
        matchLimit: matchSession.matchLimit,
      },
    });
    modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data === MatchSessionStatus.Accepted) {
        this.matchSessionFacade.updateMatchSessionStatus({
          matchSessionId: matchSession.id,
          status: MatchSessionStatus.Accepted,
        });
      }

      if (result.data === MatchSessionStatus.Declined) {
        this.matchSessionFacade.updateMatchSessionStatus({
          matchSessionId: matchSession.id,
          status: MatchSessionStatus.Declined,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
