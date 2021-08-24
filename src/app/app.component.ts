import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, from, Subject, timer } from 'rxjs';
import {
  combineAll,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthQuery } from './auth/state/auth.query';
import { UserFacade } from './data-layers/user/user.facade';
import { UserQuery } from './data-layers/user/user.query';
import { StorageService, USER_ID } from './services/storage.service';

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
    private storageService: StorageService,
    private userFacade: UserFacade,
    private userQuery: UserQuery
  ) {}

  ngOnInit() {
    this.storageService.createStorage();

    //use timer to wait until storage created
    timer(300)
      .pipe(
        withLatestFrom(this.user$, from(this.storageService.getValue(USER_ID)))
      )
      .subscribe(([_, user, userId]) => {
        if (!user && userId) {
          this.userFacade.getUser(userId);
        }
      });

    this.showStorageValue$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((key) => {
          return this.storageService.getValue(key);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
