import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  delay,
  retry,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { GameModesFacade } from '../data-layer/game-mode/game-mode.facade';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { UserFacade } from '../data-layer/user/user.facade';
import { UserQuery } from '../data-layer/user/user.query';
import { PickerComponentShared } from '../shared/components/picker/picker.component';
import { ToastComponentShared } from '../shared/components/toast/toast.component';

@Component({
  templateUrl: 'fast-match.component.html',
  styleUrls: ['fast-match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FastMatchComponent implements OnInit, OnDestroy {
  @ViewChild(PickerComponentShared, { static: true })
  readonly pickerComponent: PickerComponentShared;
  @ViewChild(ToastComponentShared)
  readonly toastComponentShared: ToastComponentShared;
  readonly fastMatchForm = this.fb.group({
    gameMode: ['', Validators.required],
    matchLimit: [
      '',
      [Validators.required, Validators.min(1), Validators.max(10)],
    ],
    guestUsername: ['', Validators.required],
  });

  readonly gameModes$ = this.gameModesFacade.selectGameModes$;
  readonly selectedUser$ = this.userQuery.selectUser$;
  readonly currentScreen$ = new BehaviorSubject<'create' | 'success' | 'error'>(
    'create'
  );
  readonly destroy$ = new Subject();

  //TODO: Переделать на статические булевые переменные
  showSpinner$ = new BehaviorSubject(false);
  showApiMessage$ = new BehaviorSubject(false);

  constructor(
    private navController: NavController,
    private fb: FormBuilder,
    private gameModesFacade: GameModesFacade,
    private userFacade: UserFacade,
    private userQuery: UserQuery,
    private matchSessionFacade: MatchSessionFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameModesFacade.getGameModes();

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && !e.url.includes('current-match')) {
        this.fastMatchForm.reset();
      }
    });
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab2/create');
  }

  navigate(url: string) {
    this.navController.navigateRoot(url);
  }

  createGame() {
    this.userFacade
      .getByUsername(this.fastMatchForm.value.guestUsername)
      .pipe(
        withLatestFrom(this.selectedUser$),
        takeUntil(this.destroy$),
        tap(() => {
          this.showSpinner$.next(true);
          setTimeout(() => {
            this.showApiMessage$.next(true);
          }, 3000);
        }),
        switchMap(([guestUser, selectedUser]) => {
          if (!guestUser) {
            this.toastComponentShared.displayToast(`Sorry, no such user`);
          } else if (guestUser.id === selectedUser.id) {
            this.toastComponentShared.displayToast(
              `Sorry, you can't invite yourself`
            );
          } else {
            return this.matchSessionFacade
              .createMatchSession({
                category: this.fastMatchForm.value.gameMode,
                matchLimit: this.fastMatchForm.value.matchLimit,
                guestId: guestUser.id as number,
              })
              .pipe(tap(console.log), delay(1000), retry(10));
          }
        })
      )
      .subscribe(
        () => {
          this.showSpinner$.next(false);
          this.currentScreen$.next('success');
        },
        ({ status }) => {
          this.showSpinner$.next(false);
          if (status === 418) {
            this.currentScreen$.next('error');
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
