import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Film } from '@src/app/data-layer/film/film.models';
import { MatchSession } from '@src/app/data-layer/match-session/match-session.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ListOfMatchedFilmsModalData {
  matchSession$: Observable<MatchSession>;
}

@Component({
  templateUrl: 'list-of-matched-films-modal.component.html',
  styleUrls: ['list-of-matched-films-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOfMatchedFilmsModalComponent {
  readonly matchSessionSerialized$: Observable<
    MatchSession & { matchedMovies: Film[] }
  >;

  constructor(
    public dialogRef: MatDialogRef<ListOfMatchedFilmsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListOfMatchedFilmsModalData
  ) {
    this.matchSessionSerialized$ = this.data.matchSession$.pipe(
      map((matchSession) => ({
        ...matchSession,
        matchSession,
        matchedMovies: matchSession.matchedMoviesJSON.map((filmJSON) =>
          JSON.parse(filmJSON)
        ),
      }))
    );
  }
}
