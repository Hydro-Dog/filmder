import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  AlertConfirm,
  AlertExample,
} from '../shared/components/modal/modal.component';

@Component({
  templateUrl: 'match-invites.component.html',
  styleUrls: ['match-invites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchInvitesComponent implements OnInit {
  @ViewChild(AlertExample, { static: true })
  alertExample: AlertExample;

  constructor(private navController: NavController) {}

  ngOnInit(): void {}

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  openConfirmationModal() {
    this.alertExample
      .presentAlertConfirm('Accept invite?')
      .then((x: AlertConfirm) => console.log('x: ', x.role));
  }
}
