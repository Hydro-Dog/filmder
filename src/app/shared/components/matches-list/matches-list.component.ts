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
import { AlertConfirm, AlertComponentShared } from '../alert/alert.component';
import {
  MatchDetailsDisplayMode,
  MatchDetailsModal,
} from '../match-details-modal/match-details-modal.component';

export enum MatchSessionsListTypes {
  Pending,
  Invites,
  Current,
}

@Component({
  selector: 'filmder-matches-table',
  templateUrl: 'matches-list.component.html',
  styleUrls: ['matches-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchesListComponentShared implements OnInit, OnDestroy {
  @Input()
  matches: MatchSession[] = [];
  @Input()
  matchSessionsListTypes: MatchSessionsListTypes;

  @Output()
  inviteAccepted = new EventEmitter();

  @Output()
  inviteDeclined = new EventEmitter();

  @ViewChild(AlertComponentShared, { static: true })
  readonly alertExample: AlertComponentShared;
  readonly matchSessionId = (index: number, item: MatchSession) => item.id;

  readonly destroy$ = new Subject();

  constructor(public modalController: ModalController) {}

  ngOnInit(): void {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: MatchDetailsModal,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async openDetailsModal(matchSession: MatchSession) {
    console.log('matchSession to modal: ', matchSession);
    const modal = await this.modalController.create({
      component: MatchDetailsModal,
      // cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        displayMode:
          this.matchSessionsListTypes === MatchSessionsListTypes.Invites
            ? MatchDetailsDisplayMode.Accept
            : MatchDetailsDisplayMode.Info,
        host: matchSession.host.userName,
        guest: matchSession.guest.userName,
        region: matchSession.region,
        category: matchSession.category,
        matchLimit: matchSession.matchLimit,
        accepted: matchSession.accepted,
        id: matchSession.id,
      },
    });
    modal.present();
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        if (data.accepted) {
          this.inviteAccepted.emit(matchSession);
        } else if (data.accepted === false) {
          this.inviteDeclined.emit(matchSession);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
