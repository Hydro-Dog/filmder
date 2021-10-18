import {
  AfterViewInit,
  Component,
  ElementRef,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { UserFacade } from '../data-layer/user/user.facade';

@Component({
  templateUrl: 'pick-film.component.html',
  styleUrls: ['pick-film.component.scss'],
})
export class PickFilmComponent implements AfterViewInit {
  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>;
  @Output()
  // people = [
  //   {
  //     name: 'Vlad',
  //     age: 25,
  //   },
  //   {
  //     name: 'Vlad 2',
  //     age: 26,
  //   },
  //   {
  //     name: 'Vlad 3',
  //     age: 27,
  //   },
  // ];
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
        console.log('hereeeeee');
        if (selectUser.id === matchSession.host.id) {
          return matchSession.filmsSequence[matchSession.hostCurrentFilmIndex];
        } else {
          return matchSession.filmsSequence[matchSession.guestCurrentFilmIndex];
        }
      })
    );
  readonly selectCurrentMatchSession$ =
    this.matchSessionFacade.selectCurrentMatchSession$;

  constructor(
    private userFacade: UserFacade,
    private matchSessionFacade: MatchSessionFacade,
    private gestureCtrl: GestureController,
    private platform: Platform
  ) {
    console.log('constructor');
    this.userFacade.selectUser$.subscribe((user) => {
      if (user) {
        console.log('user: ', user);
        this.matchSessionFacade.getCurrentMatchSession(
          user.currentMatchSession
        );
      }
    });

    this.currentFilm$.subscribe((currentFilm) =>
      console.log('currentFilm: ', currentFilm)
    );
  }

  ngAfterViewInit(): void {
    const cards = this.cards.toArray();
    console.log('cards: ', cards);

    this.useTinderSwipe(cards);
  }

  useTinderSwipe(cardArray) {
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];

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
            } else if (ev.deltaX < -150) {
              card.nativeElement.style.transform = `translateX(${
                -this.platform.width() * 2
              }px) rotate(${ev.deltaX / 10}deg)`;
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
