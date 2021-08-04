import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, from, Subject } from 'rxjs';
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
    this.user$.subscribe((x) => console.log('x: ', x));
    from(this.storageService.getValue(USER_ID)).subscribe((x) =>
      console.log('y: ', x)
    );
    combineLatest([this.user$, from(this.storageService.getValue(USER_ID))])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([user, userId]) => {
        console.log('user, userId', user, userId);
        if (!user) {
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
      .subscribe((val) => {
        console.log('val: ', val);
      });
  }

  onShowStorageValueClick(val: string) {
    this.showStorageValue$.next(val);
  }

  onClearStorageClick() {
    this.storageService.clearStorage();

    from(this.storageService.getStorage()).subscribe((storage) =>
      console.log('storage: ', storage)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
