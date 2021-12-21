import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSessionEntity } from '../data-layer/match-session/match-session.models';
import { UserFacade } from '../data-layer/user/user.facade';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/film-matches-list/matches-list.component';
import { MatchedFilmsSummaryModalShared } from '../shared/components/list-of-matched-films-modal/list-of-matched-films-modal.component';
import { CompletedMatchesDetailsModal } from './completed-matches-details/completed-matches-details.component';

@Component({
  templateUrl: 'matches-completed.component.html',
})
export class MatchesCompletedComponent {
  readonly completedMatchSessions$ =
    this.userFacade.selectCompletedMatchSessions$;

  readonly destroy$ = new Subject();

  constructor(
    private userFacade: UserFacade,
    private navController: NavController,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.userFacade.getCurrentUserMatchSessions();
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  async doRefresh($event) {
    this.userFacade.getCurrentUserMatchSessions().subscribe(() => {
      $event.target.complete();
    });
  }

  async matchClicked(matchSession: MatchSessionEntity) {
    console.log('matchClicked');

    const modal = await this.modalController.create({
      component: CompletedMatchesDetailsModal,
      swipeToClose: true,
      componentProps: {
        host: matchSession.host?.username,
        guest: matchSession.guest?.username,
        category: matchSession.category,
        matchLimit: matchSession.matchLimit,
      },
    });
    modal.present();
    modal.onDidDismiss().then((result) => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
