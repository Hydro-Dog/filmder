import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { FirebaseAnalyticsService } from '../analytics/analytics.service';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSession } from '../data-layer/match-session/match-session.models';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/film-matches-list/matches-list.component';

@Component({
  templateUrl: 'matches-pending.component.html',
})
export class MatchesPendingComponent {
  readonly matchSessionsListTypes = MatchSessionsListTypes;
  readonly selectPendingMatchSessions$ =
    this.matchSessionFacade.selectPendingMatchSessions$;

  readonly destroy$ = new Subject();

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private storageFacade: StorageFacade,
    private navController: NavController,
    private firebaseAnalyticsService: FirebaseAnalyticsService
  ) {}

  async ngOnInit() {
    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  matchDeclined(matchSession: MatchSession) {
    this.matchSessionFacade.updateMatchSession({
      ...matchSession,
      declined: true,
    });

    this.firebaseAnalyticsService.logEvent('match_declined', {
      matchId: matchSession.id.toString(),
    });
  }

  async doRefresh($event) {
    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id).subscribe(() => {
      $event.target.complete();
    });
  }
}
