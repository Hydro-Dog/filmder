import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSessionSocketEvents } from '../data-layer/match-session/match-session.models';
import { MatchSessionService } from '../data-layer/match-session/match-session.service';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page implements OnInit, OnDestroy {
  readonly matchSessions$ = this.matchSessionFacade.selectMatchSessions$;
  readonly selectPendingMatchSessions$ =
    this.matchSessionFacade.selectPendingMatchSessions$;
  readonly guestedMatchSessions$ =
    this.matchSessionFacade.selectInvitesMatchSessions$;
  readonly acceptedMatchSessions$ =
    this.matchSessionFacade.selectActiveMatchSessions$;
  readonly selectCompletedMatchSessions$ =
    this.matchSessionFacade.selectCompletedMatchSessions$;

  readonly destroy$ = new Subject();

  constructor(
    private storageFacade: StorageFacade,
    private matchSessionFacade: MatchSessionFacade
  ) {}

  async ngOnInit() {
    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id);
  }

  ngOnDestroy(): void {
    this.matchSessionFacade.stopListenForNewMatches();
    this.destroy$.next();
  }
}
