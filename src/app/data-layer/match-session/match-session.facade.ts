import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable, Subject, Subscription } from 'rxjs';
import { Film } from '../film/film.models';
import {
  loadCurrentMatchSession,
  swipe,
  updateMatchSessionStatus,
} from './match-session.actions';
import { MatchSessionEffects } from './match-session.effects';
import {
  CreateMatchSessionDTO,
  MatchSession,
  MatchSessionChangesEvents,
  MatchSessionCO,
  MatchSessionSocketEvents,
  SwipeMatchSessionStatusDTO,
  UpdateMatchSessionStatusDTO,
} from './match-session.models';
import { MatchSessionQuery } from './match-session.query';
import { MatchSessionService } from './match-session.service';

@Injectable({ providedIn: 'root' })
export class MatchSessionFacade {
  selectCurrentMatchSession$ =
    this.matchSessionQuery.selectCurrentMatchSession$;

  constructor(
    private actions: Actions,
    private matchSessionEffects: MatchSessionEffects,
    private matchSessionService: MatchSessionService,
    private matchSessionQuery: MatchSessionQuery
  ) {}

  updateMatchSessionStatus(data: UpdateMatchSessionStatusDTO) {
    this.actions.dispatch(updateMatchSessionStatus({ data }));

    return this.matchSessionEffects.updateMatchSessionStatusSuccess$;
  }

  createMatchSession(matchSession: CreateMatchSessionDTO) {
    return this.matchSessionService.create(matchSession);
  }

  loadCurrentMatchSession(id: string) {
    this.actions.dispatch(loadCurrentMatchSession({ id }));

    return this.matchSessionEffects.loadCurrentMatchSessionSuccess$;
  }

  swipe(data: SwipeMatchSessionStatusDTO) {
    this.actions.dispatch(swipe({ data }));

    return this.matchSessionEffects.swipeSuccess$;
  }

  // registerNewListener(id: string) {
  //   this.matchSessionService.msgToServer(
  //     MatchSessionSocketEvents.RegisterNewListener,
  //     { id }
  //   );
  // }

  // listenForServer() {
  //   this.socketMatchSessionSub.add(
  //     this.matchSessionService.listenForServer$.subscribe(({ message }) => {
  //       switch (message.event) {
  //         case MatchSessionChangesEvents.Add:
  //           this.actions.dispatch(
  //             socketAddMatchSessionSuccess({
  //               matchSession: message.payload,
  //             })
  //           );

  //           break;
  //         case MatchSessionChangesEvents.ChangeStatus:
  //           this.actions.dispatch(
  //             socketChangeMatchSessionSuccess({
  //               matchSession: message.payload,
  //             })
  //           );
  //           break;

  //         case MatchSessionChangesEvents.FilmsMatch:
  //           this.actions.dispatch(
  //             socketFilmsMatchSuccess({
  //               filmJSON: message.payload.filmJSON,
  //             })
  //           );

  //           this.filmsMatchHappened$.next({
  //             film: JSON.parse(message.payload.filmJSON),
  //             source: message.payload.source,
  //           });
  //           break;

  //         default:
  //           break;
  //       }
  //     })
  //   );
  // }

  // stopListenForNewMatches() {
  //   this.socketMatchSessionSub.unsubscribe();
  // }

  // swipe(
  //   matchSessionId: number,
  //   filmJSON: string,
  //   swipeDirection: 'left' | 'right'
  // ) {
  //   this.actions.dispatch(swipe({ matchSessionId, filmJSON, swipeDirection }));
  // }
}
function loadCurrentMatchSessionStatus(arg0: {
  data: any;
}): import('@datorama/akita-ng-effects/lib/types').Action {
  throw new Error('Function not implemented.');
}
