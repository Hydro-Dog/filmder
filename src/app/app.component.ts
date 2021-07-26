import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { StorageService } from './auth/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showStorageValue$ = new Subject<string>();
  destroy$ = new Subject();
  storageKey: string;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.createStorage();

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
