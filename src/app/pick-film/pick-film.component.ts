import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Gesture,
  GestureController,
  GestureDetail,
  IonCard,
  Platform,
} from '@ionic/angular';
import { Subject, timer } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { UserFacade } from '../data-layer/user/user.facade';

@Component({
  templateUrl: 'pick-film.component.html',
  styleUrls: ['pick-film.component.scss'],
})
export class PickFilmComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef;

  readonly selectFilms$ = this.userFacade.selectUser$;
  readonly filmsSequence$ =
    this.matchSessionFacade.selectCurrentMatchSession$.pipe(
      filter((x) => !!x),
      map((matchSession) => matchSession.filmsSequence)
    );

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
    this.matchSessionFacade.selectCurrentMatchSession$;
  swipe$ = new Subject<'left' | 'right'>();
  destroy$ = new Subject();

  constructor(
    private userFacade: UserFacade,
    private matchSessionFacade: MatchSessionFacade,
    private gestureCtrl: GestureController,
    private platform: Platform
  ) {}

  ngOnInit(): void {
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
          currentFilm.id,
          swipeDirection
        );
      });
  }

  ngAfterViewInit(): void {
    this.useTinderSwipe(this.card);
  }

  async useTinderSwipe(card: ElementRef<any>) {
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
          // this.setCardColor(ev.deltaX, card.nativeElement);
        },
        onEnd: (ev) => {
          card.nativeElement.style.transition = '0.3s ease-out';

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

  // setCardColor(x, element) {
  //   let color = '';
  //   const abs = Math.abs(x);
  //   const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
  //   const hexCode = this.decimalToHex(min, 2);

  //   if (x < 0) {
  //     console.log('color +: ', color);
  //     color = '#FF' + hexCode + hexCode;
  //   } else {
  //     color = '#' + hexCode + 'FF' + hexCode;
  //   }

  //   element.style.background = color;
  // }

  // decimalToHex(d, padding) {
  //   let hex = Number(d).toString(16);
  //   padding =
  //     typeof padding === 'undefined' || padding === null
  //       ? (padding = 2)
  //       : padding;

  //   while (hex.length < padding) {
  //     hex = '0' + hex;
  //   }

  //   return hex;
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
