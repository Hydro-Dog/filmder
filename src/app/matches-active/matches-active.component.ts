import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
import { FirebaseAnalyticsService } from '../analytics/analytics.service';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSession } from '../data-layer/match-session/match-session.models';
import { UserFacade } from '../data-layer/user/user.facade';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/film-matches-list/matches-list.component';

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

  readonly activeMatchSessionId$ =
    this.matchSessionFacade.selectCurrentMatchSession$.pipe(
      filter(Boolean),
      map(({ id }) => id.toString())
    );
  readonly matchesLoading$ =
    this.matchSessionFacade.selectMatchSessionsLoading$;

  readonly continueMatch$ = new Subject<MatchSession>();
  readonly matchDeclined$ = new Subject<MatchSession>();
  readonly destroy$ = new Subject();

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private userFacade: UserFacade,
    private storageFacade: StorageFacade,
    private navController: NavController,
    private firebaseAnalyticsService: FirebaseAnalyticsService
  ) {}

  async ngOnInit() {
    this.continueMatch$
      .pipe(
        withLatestFrom(this.currentUser$),
        takeUntil(this.destroy$),
        tap(([matchSession, currentUser]) => {
          this.userFacade.updateUser({
            ...currentUser,
            currentMatchSession: matchSession.id.toString(),
          });
        }),
        delay(300)
      )
      .subscribe(() => {
        this.navController.navigateRoot('/tabs/tab2/current-match');
      });

    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id);

    this.matchDeclined$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((matchSession) => {
          return this.matchSessionFacade.updateMatchSession({
            ...matchSession,
            declined: true,
          });
        }),
        withLatestFrom(this.currentUser$)
      )
      .subscribe(([res, currentUser]) => {
        if (+res.matchSession.id === +currentUser.currentMatchSession) {
          this.userFacade.updateUser({
            ...currentUser,
            currentMatchSession: '',
          });
        }

        this.firebaseAnalyticsService.logEvent('match_declined', {
          matchId: res.matchSession.id.toString(),
        });
      });
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  async doRefresh($event) {
    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id).subscribe(() => {
      $event.target.complete();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
