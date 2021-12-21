import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatchSessionEntity } from '@src/app/data-layer/match-session/match-session.models';
import { Subject } from 'rxjs';

@Component({
  selector: 'filmder-matches-list',
  templateUrl: 'matches-list.component.html',
  styleUrls: ['matches-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchesListShared implements OnInit {
  @Input() matches: MatchSessionEntity[] = [];
  @Input() allowDeletion = false;

  @Output() itemClicked = new EventEmitter<MatchSessionEntity>();
  @Output() itemDeleted = new EventEmitter<MatchSessionEntity>();

  // @Input() matchSessionsListTypes: MatchSessionsListTypes;
  // @Input() activeMatchSessionId: string;

  // @Output() continueMatch = new EventEmitter();
  // @Output() inviteAccepted = new EventEmitter();
  // @Output() matchDeclined = new EventEmitter();
  // @Output() matchRemoved = new EventEmitter();

  // @ViewChild(AlertComponentShared, { static: true })
  // readonly alertExample: AlertComponentShared;
  readonly matchSessionId = (_, item: MatchSessionEntity) => item.id;

  readonly destroy$ = new Subject();

  constructor(public modalController: ModalController) {}

  ngOnInit(): void {
    console.log('ngOnInit: ');
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: MatchDetailsModal,
  //   });
  //   return await modal.present();
  // }

  // async openDetailsModal(matchSession: MatchSession) {
  //   let displayMode: MatchDetailsDisplayMode;

  //   switch (this.matchSessionsListTypes) {
  //     case MatchSessionsListTypes.Active:
  //       displayMode = MatchDetailsDisplayMode.Continue;
  //       break;
  //     case MatchSessionsListTypes.Pending:
  //       displayMode = MatchDetailsDisplayMode.Info;
  //       break;
  //     case MatchSessionsListTypes.Invites:
  //       displayMode = MatchDetailsDisplayMode.Accept;
  //       break;
  //     case MatchSessionsListTypes.Completed:
  //       displayMode = MatchDetailsDisplayMode.Summary;
  //       break;

  //     default:
  //       break;
  //   }

  //   const modal = await this.modalController.create({
  //     component: MatchDetailsModal,
  //     swipeToClose: true,
  //     componentProps: {
  //       displayMode,
  //       host: matchSession.host?.username,
  //       guest: matchSession.guest?.username,
  //       region: matchSession.region,
  //       category: matchSession.category,
  //       matchLimit: matchSession.matchLimit,
  //       accepted: matchSession.accepted,
  //       completed: matchSession.completed,
  //       id: matchSession.id,
  //       matchedMovies: matchSession.matchedMoviesJSON.map((x) => JSON.parse(x)),
  //     },
  //   });
  //   modal.present();
  //   modal.onDidDismiss().then(({ data }) => {
  //     if (data) {
  //       switch (data.event) {
  //         case MatchDetailsModalActions.Continue:
  //           this.continueMatch.emit(matchSession);
  //           break;
  //         case MatchDetailsModalActions.Accept:
  //           this.inviteAccepted.emit(matchSession);
  //           break;
  //         case MatchDetailsModalActions.Decline:
  //           this.matchDeclined.emit(matchSession);
  //           break;
  //         case MatchDetailsModalActions.Nothing:
  //           break;
  //       }
  //     }
  //   });
  // }

  // delete(matchSessionId: number) {
  //   this.matchRemoved.emit(matchSessionId);
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
