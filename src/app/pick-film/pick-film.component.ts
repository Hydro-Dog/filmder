import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
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
      filter((x) => !!x),
      withLatestFrom(this.userFacade.selectUser$),
      map(([matchSession, selectUser]) => {
        if (selectUser.id === matchSession.host.id) {
          console.log('matchSession: ', matchSession);
          return matchSession.filmsSequence[matchSession.hostCurrentFilmIndex];
        } else {
          return matchSession.filmsSequence[matchSession.guestCurrentFilmIndex];
        }
      })
    );
  readonly selectCurrentMatchSession$ =
    this.matchSessionFacade.selectCurrentMatchSession$;
  swipeRight$ = new Subject();
  destroy$ = new Subject();

  constructor(
    private userFacade: UserFacade,
    private matchSessionFacade: MatchSessionFacade,
    private gestureCtrl: GestureController,
    private platform: Platform
  ) {
    console.log('constructor');
    this.currentFilm$.subscribe((currentFilm) =>
      console.log('currentFilm: ', currentFilm)
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.userFacade.selectUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          console.log('user: ', user);
          this.matchSessionFacade.getCurrentMatchSession(
            user.currentMatchSession
          );
        }
      });

    this.swipeRight$
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(
          this.matchSessionFacade.selectCurrentMatchSession$,
          this.currentFilm$
        )
      )
      .subscribe(([_, currentMatchSession, currentFilm]) => {
        this.matchSessionFacade.swipeRight(
          currentMatchSession.id,
          currentFilm.id
        );
      });
  }

  ngAfterViewInit(): void {
    console.log('this.card: ', this.card);

    this.useTinderSwipe(this.card);
  }

  async useTinderSwipe(card) {
    const gesture: Gesture = this.gestureCtrl.create(
      {
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'swipe',
        onStart: (ev) => {
          console.log('ev: ', ev);
        },
        onMove: (ev) => {
          card.nativeElement.style.transform = `translateX(${
            ev.deltaX
          }px) rotate(${ev.deltaX / 10}deg)`;
          // this.setCardColor(ev.deltaX, card.nativeElement);
        },
        onEnd: (ev) => {
          card.nativeElement.style.transition = '0.3s ease-out';

          if (ev.deltaX > 150) {
            card.nativeElement.style.transform = `translateX(${
              this.platform.width() * 2
            }px) rotate(${ev.deltaX / 10}deg)`;

            setTimeout(() => {
              card.nativeElement.style.display = 'none';
            }, 100);

            setTimeout(() => {
              card.nativeElement.style.transform = '';
            }, 500);

            setTimeout(() => {
              card.nativeElement.style.display = 'block';
            }, 500);

            this.swipeRight$.next();
          } else if (ev.deltaX < -150) {
            card.nativeElement.style.transform = `translateX(${
              -this.platform.width() * 2
            }px) rotate(${ev.deltaX / 10}deg)`;
            card.nativeElement.style.display = 'none';

            setTimeout(() => {
              card.nativeElement.style.transform = '';
            }, 500);

            setTimeout(() => {
              card.nativeElement.style.display = 'block';
            }, 500);
          } else {
            card.nativeElement.style.transform = '';
          }
        },
      },
      true
    );

    gesture.enable(true);
  }

  setCardColor(x, element) {
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      console.log('color +: ', color);
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
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
}
