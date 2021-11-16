import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import {
  Gesture,
  GestureController,
  GestureDetail,
  IonCard,
  ModalController,
  Platform,
} from '@ionic/angular';
import { of, Subject, timer } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { UserFacade } from '../data-layer/user/user.facade';
import { MatchedFilmsSummaryModalShared } from '../shared/components/list-of-matched-films-modal/list-of-matched-films-modal.component';
import { MatchHappenedModal } from '../shared/components/match-happend-modal/match-happend-modal.component';
import { ToastComponentShared } from '../shared/components/toast/toast.component';

@Component({
  templateUrl: 'pick-film.component.html',
  styleUrls: ['pick-film.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickFilmComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef;
  @ViewChild(ToastComponentShared) toastComponentShared: ToastComponentShared;

  readonly selectFilms$ = this.userFacade.selectUser$;

  readonly currentFilm$ =
    this.matchSessionFacade.selectCurrentMatchSession$.pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
      filter((x) => !!x),
      withLatestFrom(this.userFacade.selectUser$),
      map(([matchSession, selectUser]) => {
        if (selectUser.id === matchSession.host.id) {
          return matchSession.filmsSequence[matchSession.hostCurrentFilmIndex];
        } else {
          return matchSession.filmsSequence[matchSession.guestCurrentFilmIndex];
        }
      })
    );

  readonly selectCurrentMatchSession$ =
    this.matchSessionFacade.selectCurrentMatchSession$.pipe(
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  readonly matchedMovies$ = this.selectCurrentMatchSession$.pipe(
    map((matchSession) =>
      matchSession?.matchedMoviesJSON.map((x) => JSON.parse(x))
    )
  );

  readonly swipe$ = new Subject<'left' | 'right'>();
  readonly openMatchedFilmsDialog$ = new Subject();
  readonly destroy$ = new Subject();

  constructor(
    private userFacade: UserFacade,
    private matchSessionFacade: MatchSessionFacade,
    private gestureCtrl: GestureController,
    private platform: Platform,
    private router: Router,
    public modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && !e.url.includes('current-match')) {
        this.selectCurrentMatchSession$
          .pipe(first(), withLatestFrom(this.userFacade.selectUser$))
          .subscribe(([matchSession, currentUser]) => {
            if (matchSession?.completed) {
              this.userFacade.updateUser({
                ...currentUser,
                currentMatchSession: '',
              });
              this.matchSessionFacade.resetStore();
            }
          });
      }
    });
    this.userFacade.selectUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.matchSessionFacade.getCurrentMatchSession(
            user.currentMatchSession
          );
        }
      });

    this.swipe$
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(
          this.matchSessionFacade.selectCurrentMatchSession$,
          this.currentFilm$
        )
      )
      .subscribe(([swipeDirection, currentMatchSession, currentFilm]) => {
        this.matchSessionFacade.swipe(
          currentMatchSession.id,
          JSON.stringify(currentFilm),
          swipeDirection
        );
      });

    this.matchSessionFacade.filmsMatchHappened$.subscribe(
      async (filmsMatchHappened) => {
        const modal = await this.modalController.create({
          component: MatchHappenedModal,
          showBackdrop: false,
          cssClass: ['match-happened-modal'],
          animated: true,
          componentProps: {
            source: filmsMatchHappened.source,
            film: filmsMatchHappened.film,
          },
        });
        modal.present();
        setTimeout(() => {
          modal.dismiss();
        }, 4000);
      }
    );

    this.openMatchedFilmsDialog$
      .pipe(
        withLatestFrom(this.selectCurrentMatchSession$),
        takeUntil(this.destroy$)
      )
      .subscribe(async ([_, matchSession]) => {
        const modal = await this.modalController.create({
          component: MatchedFilmsSummaryModalShared,
          swipeToClose: true,
          componentProps: {
            matchedMovies: matchSession.matchedMoviesJSON.map((x) =>
              JSON.parse(x)
            ),
          },
        });
        modal.present();
      });
  }

  ngAfterViewInit(): void {
    this.useTinderSwipe(this.card);
  }

  async useTinderSwipe(card: ElementRef<any>) {
    if (card) {
      const gesture: Gesture = this.gestureCtrl.create(
        {
          el: card.nativeElement,
          threshold: 15,
          gestureName: 'swipe',
          onStart: (ev) => {},
          onMove: (ev) => {
            card.nativeElement.style.transform = `translateX(${
              ev.deltaX
            }px) rotate(${ev.deltaX / 10}deg)`;
            this.setCardColor(ev.deltaX, card.nativeElement);
          },
          onEnd: (ev) => {
            card.nativeElement.style.transition = '0.3s ease-out';
            card.nativeElement.style.border = '7px solid white';
            if (ev.deltaX > 150) {
              this.hideCard(card, ev, 'right');
              this.scheduleCardDisplaySteps(card);
              this.swipe$.next('right');
            } else if (ev.deltaX < -150) {
              this.hideCard(card, ev, 'left');
              this.scheduleCardDisplaySteps(card);
              this.swipe$.next('left');
            } else {
              card.nativeElement.style.transform = '';
            }
          },
        },
        true
      );

      gesture.enable(true);
    }
  }

  scheduleCardDisplaySteps(card: ElementRef<any>) {
    timer(50)
      .pipe(
        switchMap(() => {
          card.nativeElement.style.display = 'none';
          return timer(300);
        })
      )
      .subscribe(() => {
        card.nativeElement.style.display = 'block';
        card.nativeElement.style.transform = '';
      });
  }

  hideCard(
    card: ElementRef<any>,
    event: GestureDetail,
    direction: 'left' | 'right'
  ) {
    if (direction === 'left') {
      card.nativeElement.style.transform = `translateX(${
        -this.platform.width() * 2
      }px) rotate(${event.deltaX / 10}deg)`;
    } else {
      card.nativeElement.style.transform = `translateX(${
        this.platform.width() * 2
      }px) rotate(${event.deltaX / 10}deg)`;
    }
  }

  setCardColor(x, element) {
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.border = '7px solid ' + color;
  }

  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding =
      typeof padding === 'undefined' || padding === null
        ? (padding = 2)
        : padding;

    while (hex.length < padding) {
      hex = '0' + hex;
    }

    return hex;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
