import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { MatchSession } from '../../../data-layer/match-session/match-session.models';
import { AlertComponentShared } from '../alert/alert.component';
import {
  MatchDetailsDisplayMode,
  MatchDetailsModal,
  MatchDetailsModalActions,
} from '../match-details-modal/match-details-modal.component';

export enum MatchSessionsListTypes {
  Pending,
  Invites,
  Active,
  Completed,
}

@Component({
  selector: 'filmder-matches-table',
  templateUrl: 'matches-list.component.html',
  styleUrls: ['matches-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchesListComponentShared implements OnInit, OnDestroy {
  @Input() matches: MatchSession[] = [];
  @Input() matchSessionsListTypes: MatchSessionsListTypes;
  @Input() activeMatchSessionId: string;

  @Output() continueMatch = new EventEmitter();
  @Output() inviteAccepted = new EventEmitter();
  @Output() matchDeclined = new EventEmitter();
  @Output() matchRemoved = new EventEmitter();

  @ViewChild(AlertComponentShared, { static: true })
  readonly alertExample: AlertComponentShared;
  readonly matchSessionId = (index: number, item: MatchSession) => item.id;

  readonly destroy$ = new Subject();

  constructor(public modalController: ModalController) {}

  ngOnInit(): void {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: MatchDetailsModal,
    });
    return await modal.present();
  }

  async openDetailsModal(matchSession: MatchSession) {
    let displayMode: MatchDetailsDisplayMode;

    switch (this.matchSessionsListTypes) {
      case MatchSessionsListTypes.Active:
        displayMode = MatchDetailsDisplayMode.Continue;
        break;
      case MatchSessionsListTypes.Pending:
        displayMode = MatchDetailsDisplayMode.Info;
        break;
      case MatchSessionsListTypes.Invites:
        displayMode = MatchDetailsDisplayMode.Accept;
        break;
      case MatchSessionsListTypes.Completed:
        displayMode = MatchDetailsDisplayMode.Summary;
        break;

      default:
        break;
    }

    const modal = await this.modalController.create({
      component: MatchDetailsModal,
      swipeToClose: true,
      componentProps: {
        displayMode,
        host: matchSession.host.userName,
        guest: matchSession.guest.userName,
        region: matchSession.region,
        category: matchSession.category,
        matchLimit: matchSession.matchLimit,
        accepted: matchSession.accepted,
        completed: matchSession.completed,
        id: matchSession.id,
        matchedMovies: matchSession.matchedMoviesJSON.map((x) => JSON.parse(x)),
      },
    });
    modal.present();
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        switch (data.event) {
          case MatchDetailsModalActions.Continue:
            this.continueMatch.emit(matchSession);
            break;
          case MatchDetailsModalActions.Accept:
            this.inviteAccepted.emit(matchSession);
            break;
          case MatchDetailsModalActions.Decline:
            this.matchDeclined.emit(matchSession);
            break;
          case MatchDetailsModalActions.Nothing:
            break;
        }
      }
    });
  }

  delete(matchSessionId: number) {
    this.matchRemoved.emit(matchSessionId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
