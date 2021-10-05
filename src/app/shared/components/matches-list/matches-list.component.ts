import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
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

  @ViewChild(AlertComponentShared, { static: true })
  readonly alertExample: AlertComponentShared;
  // readonly matchSessions$ = this.matchSessionFacade.selectMatchSessions$;
  // readonly guestedMatchSessions$ =
  //   this.matchSessionFacade.selectGuestedMatchSessions$;

  readonly matchSessionId = (index: number, item: MatchSession) => item.id;

  readonly destroy$ = new Subject();

  constructor(public modalController: ModalController) {} // private matchSessionFacade: MatchSessionFacade // private userFacade: UserFacade, // private navController: NavController,

  ngOnInit(): void {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: MatchDetailsModal,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async openDetailsModal(matchSession: MatchSession) {
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
      },
    });
    modal.present();
    modal.onDidDismiss().then((res) => console.log('res: ', res));
    // switch (this.matchSessionsListTypes) {
    //   case MatchSessionsListTypes.Current:
    //     // code block
    //     break;
    //   case MatchSessionsListTypes.Pending:
    //     // code block
    //     break;
    //   case MatchSessionsListTypes.Invites:
    //     // code block
    //     break;
    //   default:
    //   // code block
    // }

    // this.alertExample
    //   .presentAlert(
    //     'Match details',
    //     `${matchSession.category} ${matchSession.host.userName} ${matchSession.matchLimit} ${matchSession.region}`
    //   )
    //   .then((x) => console.log('x: ', x));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
