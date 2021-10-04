import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { MatchSessionFacade } from '../data-layer/match-session/match-session.facade';
import { MatchSession } from '../data-layer/match-session/match-session.models';
import { UserFacade } from '../data-layer/user/user.facade';
import {
  AlertConfirm,
  ModalComponentShared,
} from '../shared/components/modal/modal.component';

@Component({
  templateUrl: 'match-invites.component.html',
  styleUrls: ['match-invites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchInvitesComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponentShared, { static: true })
  readonly alertExample: ModalComponentShared;
  readonly matchSessions$ = this.matchSessionFacade.selectMatchSessions$;
  readonly guestedMatchSessions$ =
    this.matchSessionFacade.selectGuestedMatchSessions$;

  readonly matchSessionId = (index: number, item: MatchSession) => item.id;

  readonly destroy$ = new Subject();

  constructor(
    private navController: NavController,
    private userFacade: UserFacade,
    private matchSessionFacade: MatchSessionFacade
  ) {}

  ngOnInit(): void {
    this.userFacade.selectUser$
      .pipe(
        filter((x) => !!x),
        first()
      )
      .subscribe((user) =>
        this.matchSessionFacade.getMatchSessionsByUserId(user.id)
      );
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  openConfirmationModal() {
    this.alertExample
      .presentAlertConfirm('Accept invite?')
      .then((x: AlertConfirm) => console.log('x: ', x.role));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
