import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Film } from '@src/app/data-layer/film/film.models';
import { MatchSession } from '@src/app/data-layer/match-session/match-session.models';
import { Observable } from 'rxjs';

export interface ListOfMatchedFilmsModalData {
  matchSession$: Observable<MatchSession & { matchedMovies: Film[] }>;
}

@Component({
  templateUrl: 'list-of-matched-films-modal.component.html',
  styleUrls: ['list-of-matched-films-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOfMatchedFilmsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ListOfMatchedFilmsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListOfMatchedFilmsModalData
  ) {
    this.data.matchSession$.subscribe((x) => console.log('x: ', x));
  }
}
