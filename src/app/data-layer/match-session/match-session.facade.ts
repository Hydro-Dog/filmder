import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable, Subject, Subscription } from 'rxjs';
import { Film } from '../film/film.models';
import { updateMatchSessionStatus } from './match-session.actions';
import { MatchSessionEffects } from './match-session.effects';
import {
  MatchSession,
  MatchSessionChangesEvents,
  MatchSessionCO,
  MatchSessionSocketEvents,
  UpdateMatchSessionStatusDTO,
} from './match-session.models';
import { MatchSessionQuery } from './match-session.query';
import { MatchSessionService } from './match-session.service';

@Injectable({ providedIn: 'root' })
export class MatchSessionFacade {
  // readonly selectMatchSessionsLoading$: Observable<boolean> =
  //   this.matchSessionQuery.selectMatchSessionsLoading$;

  // readonly selectCurrentMatchSession$: Observable<MatchSession> =
  //   this.matchSessionQuery.selectCurrentMatchSession$;

  // readonly selectMatchSessions$: Observable<MatchSession[]> =
  //   this.matchSessionQuery.selectMatchSessions$;

  // readonly selectInvitesMatchSessions$: Observable<MatchSession[]> =
  //   this.matchSessionQuery.selectInvitesMatchSessions$;

  // readonly selectActiveMatchSessions$: Observable<MatchSession[]> =
  //   this.matchSessionQuery.selectActiveMatchSessions$;

  // readonly selectPendingMatchSessions$: Observable<MatchSession[]> =
  //   this.matchSessionQuery.selectPendingMatchSessions$;

  // readonly selectCompletedMatchSessions$: Observable<MatchSession[]> =
  //   this.matchSessionQuery.completedMatchSessions$;

  // readonly socketMatchSessionSub = new Subscription();
  // readonly filmsMatchHappened$ = new Subject<{
  //   film: Film;
  //   source: 'self' | 'opponent';
  // }>();

  constructor(
    private actions: Actions,
    private matchSessionEffects: MatchSessionEffects
  ) {}

  updateMatchSessionStatus(data: UpdateMatchSessionStatusDTO) {
    this.actions.dispatch(updateMatchSessionStatus({ data }));

    return this.matchSessionEffects.updateMatchSessionStatusSuccess$;
  }

  // resetStore() {
  //   this.actions.dispatch(resetStore());
  // }

  // createMatchSession(matchSession: MatchSessionCO) {
  //   return this.matchSessionService.create(matchSession);
  // }

  // updateMatchSession(matchSession: MatchSession) {
  //   this.actions.dispatch(updateMatchSession({ matchSession }));

  //   return this.matchSessionEffects.updateMatchSessionSuccess$;
  // }

  // // setCurrentMatchSession(matchSession: MatchSession) {
  // //   this.actions.dispatch(setCurrentMatchSessionSuccess({ matchSession }));
  // // }

  // deleteMatchSession(matchSessionId: number) {
  //   this.actions.dispatch(deleteMatchSession({ matchSessionId }));
  // }

  // getMatchSessionsByUserId(userId: number) {
  //   this.actions.dispatch(getMatchSessionsByUserId({ userId }));

  //   return this.matchSessionEffects.getMatchSessionsByUserIdSuccess$;
  // }

  // getCurrentMatchSession(matchSessionId: string) {
  //   this.actions.dispatch(getCurrentMatchSession({ matchSessionId }));
  // }

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
