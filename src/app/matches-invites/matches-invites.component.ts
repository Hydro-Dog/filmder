import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
import { MatchSession } from '../data-layer/match-session/match-session.models';
import { UserFacade } from '../data-layer/user/user.facade';
import { StorageFacade, STORAGE_ITEMS } from '../services/storage.service';
import { MatchSessionsListTypes } from '../shared/components/film-matches-list/matches-list.component';

@Component({
  templateUrl: 'matches-invites.component.html',
})
export class MatchesInvitesComponent implements OnInit, OnDestroy {
  readonly matchSessionsListTypes = MatchSessionsListTypes;
  // readonly selectInvitesMatchSessions$ =
  //   this.matchSessionFacade.selectInvitesMatchSessions$;
  // readonly currentUser$ = this.userFacade.selectUser$.pipe(
  //   filter((x) => !!x),
  //   shareReplay({ refCount: true, bufferSize: 1 })
  // );

  readonly inviteAccepted$ = new Subject<MatchSession>();
  readonly destroy$ = new Subject();

  constructor(
    private matchSessionFacade: MatchSessionFacade,
    private userFacade: UserFacade,
    private storageFacade: StorageFacade,
    private navController: NavController
  ) {}

  async ngOnInit() {
    const id = await this.storageFacade.getItem(STORAGE_ITEMS.USER_ID);
    this.matchSessionFacade.getMatchSessionsByUserId(id);

    // this.inviteAccepted$
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     switchMap((matchSession) => {
    //       return this.matchSessionFacade.updateMatchSession({
    //         ...matchSession,
    //         accepted: true,
    //       });
    //     }),
    //     withLatestFrom(this.currentUser$)
    //   )
    //   .subscribe(([res, currentUser]) => {
    //     this.navController.navigateRoot('/tabs/tab2/current-match');
    //     this.userFacade.updateUser({
    //       ...currentUser,
    //       currentMatchSession: res.matchSession.id.toString(),
    //     });
    //     this.matchSessionFacade.setCurrentMatchSession(res.matchSession);
    //   });
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
