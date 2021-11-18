import { Component, Input } from '@angular/core';
import { Film } from '@src/app/data-layer/film/film.models';
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
]);

@Component({
  selector: 'filmder-film-card',
  templateUrl: 'film-card.component.html',
  styleUrls: ['film-card.component.scss'],
  animations: [fadeAnimation],
})
export class FilmCardShared {
  @Input() film: Film;
  @Input() showSpinner = false;
  showOverview = false;

  setShowOverview(val: boolean) {
    this.showOverview = val;
  }
}
