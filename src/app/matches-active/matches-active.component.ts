import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSession } from '../data-layer/match-session/match-session.models';
import { UserFacade } from '../data-layer/user/user.facade';
import { User } from '../data-layer/user/user.models';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/matches-list/matches-list.component';

@Component({
  templateUrl: 'matches-active.component.html',
})
export class MatchesActiveComponent implements OnInit, OnDestroy {
  readonly matchSessionsListTypes = MatchSessionsListTypes;
  readonly selectActiveMatchSessions$ =
    this.matchSessionFacade.selectActiveMatchSessions$;
  readonly currentUser$ = this.userFacade.selectUser$.pipe(
    filter((x) => !!x),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  readonly activeMatchSessionId$ = this.currentUser$.pipe(
    map((user) => user.currentMatchSession)
  );

  readonly continueMatch$ = new Subject<MatchSession>();
  readonly destroy$ = new Subject();

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private userFacade: UserFacade,
    private storageFacade: StorageFacade,
    private navController: NavController
  ) {}

  async ngOnInit() {
    this.continueMatch$
      .pipe(withLatestFrom(this.currentUser$), takeUntil(this.destroy$))
      .subscribe(([matchSession, currentUser]) => {
        this.userFacade.updateUser({
          ...currentUser,
          currentMatchSession: matchSession.id.toString(),
        });
      });
    this.currentUser$.subscribe((currentUser) =>
      console.log('currentUser: ', currentUser)
    );
    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id);
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  matchDeclined(matchSession: MatchSession) {
    this.matchSessionFacade.updateMatchSession({
      ...matchSession,
      declined: true,
    });
  }

  // async continueMatch(matchSession: MatchSession) {
  //   console.log('continueMatch');
  //   const user = await this.currentUser$.toPromise();
  //   console.log('user: ', user);
  //   this.userFacade.updateUser({
  //     ...user,
  //     currentMatchSession: matchSession.id.toString(),
  //   });
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
