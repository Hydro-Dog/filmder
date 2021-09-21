import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { MatchSessionFacade } from '../data-access/match-session/match-session.facade';
import { ScopeSearchMatchSession } from '../data-access/match-session/match-session.models';
import { UserFacade } from '../data-access/user/user.facade';
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
  alertExample: ModalComponentShared;

  selectInvitedMatchSessions$ =
    this.matchSessionFacade.selectInvitedMatchSessions$;

  destroy$ = new Subject();

  constructor(
    private navController: NavController,
    private userFacade: UserFacade,
    private matchSessionFacade: MatchSessionFacade
  ) {}

  ngOnInit(): void {
    this.selectInvitedMatchSessions$.subscribe((selectInvitedMatchSessions) =>
      console.log('selectInvitedMatchSessions: ', selectInvitedMatchSessions)
    );
    this.userFacade.selectUser$
      .pipe(
        filter((x) => !!x),
        first()
      )
      .subscribe((user) =>
        this.matchSessionFacade.searchMatchSessions(
          user.id,
          ScopeSearchMatchSession.Invited
        )
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
