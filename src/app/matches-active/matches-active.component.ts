import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import {
  delay,
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import {
  MatchSession,
  MatchSessionEntity,
} from '../data-layer/match-session/match-session.models';
import { UserFacade } from '../data-layer/user/user.facade';
import { PendingMatchDetailsModal } from '../matches-pending/pending-match-details/pending-match-details.component';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/film-matches-list/matches-list.component';
import { MatchDetailsModalActions } from '../shared/components/match-details-modal/match-details-modal.component';
import { ActiveMatchDetailsModal } from './active-match-details/active-match-details.component';

@Component({
  templateUrl: 'matches-active.component.html',
})
export class MatchesActiveComponent implements OnInit, OnDestroy {
  readonly activeMatchSessions$ = this.userFacade.selectActiveMatchSessions$;

  readonly destroy$ = new Subject();

  constructor(
    private modalController: ModalController,
    private userFacade: UserFacade,
    private navController: NavController
  ) {}

  async ngOnInit() {
    this.userFacade.getCurrentUserMatchSessions();
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  async matchClicked(matchSession: MatchSessionEntity) {
    const modal = await this.modalController.create({
      component: ActiveMatchDetailsModal,
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
      if (result.data === MatchDetailsModalActions.Leave) {
      }
    });
  }

  async doRefresh($event) {
    this.userFacade.getCurrentUserMatchSessions().subscribe(() => {
      $event.target.complete();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
