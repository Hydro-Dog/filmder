import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import {
  MatchSessionEntity,
  MatchSessionStatus,
} from '../data-layer/match-session/match-session.models';
import { UserFacade } from '../data-layer/user/user.facade';
import { MatchDetailsModalActions } from '../shared/components/match-details-modal/match-details-modal.component';
import { PendingMatchDetailsModal } from './pending-match-details/pending-match-details.component';

@Component({
  templateUrl: 'matches-pending.component.html',
})
export class MatchesPendingComponent {
  readonly pendingMatchSessions$ = this.userFacade.selectPendingMatchSessions$;

  readonly destroy$ = new Subject();

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private modalController: ModalController,
    private navController: NavController,
    private userFacade: UserFacade
  ) {}

  async ngOnInit() {
    this.userFacade.getCurrentUserMatchSessions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  async matchClicked(matchSession: MatchSessionEntity) {
    console.log('matchClicked');

    const modal = await this.modalController.create({
      component: PendingMatchDetailsModal,
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
      if (result.data === MatchSessionStatus.Declined) {
        this.matchSessionFacade.updateMatchSessionStatus({
          matchSessionId: matchSession.id,
          status: MatchSessionStatus.Declined,
        });
      }
    });
  }

  matchDeleted($event) {
    console.log('matchDeleted');
  }

  async doRefresh($event) {
    this.userFacade.getCurrentUserMatchSessions().subscribe(() => {
      $event.target.complete();
    });
  }
}
