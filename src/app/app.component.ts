import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, from, Subject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { MatchSessionFacade } from './data-layer/match-session/match-session.facade';
import { UserFacade } from './data-layer/user/user.facade';
import { UserQuery } from './data-layer/user/user.query';
import { StorageFacade, STORAGE_ITEMS } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showStorageValue$ = new Subject<string>();
  destroy$ = new Subject();
  storageKey: string;
  user$ = this.userQuery.selectUser$;

  constructor(
    private storageFacade: StorageFacade,
    private userFacade: UserFacade,
    private userQuery: UserQuery,
    private matchSessionFacade: MatchSessionFacade
  ) {}

  ngOnInit() {
    this.userFacade.selectUser$.subscribe((user) => {
      if (user?.currentMatchSession) {
        this.matchSessionFacade.getCurrentMatchSession(
          user.currentMatchSession
        );
      }
    });

    from(this.storageFacade.createStorage())
      .pipe(
        first(),
        switchMap(() =>
          combineLatest([
            this.user$,
            from(this.storageFacade.getItem(STORAGE_ITEMS.USER_ID)),
          ])
        ),
        first()
      )
      .subscribe(([user, userId]) => {
        if (!user && userId) {
          this.userFacade.getUser(userId);
        }

        this.matchSessionFacade.registerNewListener(userId);
        this.matchSessionFacade.listenForServer();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
