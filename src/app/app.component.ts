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
  currentUser$ = this.userQuery.selectCurrentUser$;

  constructor(
    private storageFacade: StorageFacade,
    private userFacade: UserFacade,
    private userQuery: UserQuery
  ) // private matchSessionFacade: MatchSessionFacade
  {}

  ngOnInit() {
    this.userFacade.selectCurrentUser$.subscribe((user) => {
      console.log('STORE.currentUser: ', user);
    });

    from(this.storageFacade.createStorage())
      .pipe(
        first(),
        switchMap(() =>
          combineLatest([
            this.currentUser$,
            from(this.storageFacade.getItem(STORAGE_ITEMS.USER_ID)),
          ])
        ),
        first()
      )
      .subscribe(([user, userId]) => {
        if (!user && userId) {
          this.userFacade.getCurrentUser();
        }

        // this.matchSessionFacade.registerNewListener(userId);
        // this.matchSessionFacade.listenForServer();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
