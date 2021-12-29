import { Component, Input } from '@angular/core';
import { Film } from '@src/app/data-layer/film/film.models';

@Component({
  templateUrl: 'match-happend-modal.component.html',
  styleUrls: ['match-happend-modal.component.scss'],
})
export class MatchHappenedModal {
  @Input() film: Film;
}
