import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { UserFacade } from '../data-layer/user/user.facade';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page implements OnInit, OnDestroy {
  readonly invitesMatchSessions$ = this.userFacade.selectInvitesMatchSessions$;

  readonly activeMatchSessions$ = this.userFacade.selectActiveMatchSessions$;

  readonly pendingMatchSessions$ = this.userFacade.selectPendingMatchSessions$;

  readonly completedMatchSessions$ =
    this.userFacade.selectCompletedMatchSessions$;

  readonly destroy$ = new Subject();

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.userFacade.loadCurrentUserMatchSessions();
  }

  async doRefresh($event) {
    this.userFacade.loadCurrentUserMatchSessions().subscribe(() => {
      $event.target.complete();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
