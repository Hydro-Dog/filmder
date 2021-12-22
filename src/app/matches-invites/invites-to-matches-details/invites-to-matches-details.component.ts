import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatchSessionStatus } from '@src/app/data-layer/match-session/match-session.models';
import { MatchDetailsModalActions } from '@src/app/shared/components/match-details-modal/match-details-modal.component';

@Component({
  templateUrl: 'invites-to-matches-details.component.html',
  styleUrls: ['invites-to-matches-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitesMatchesDetailsModal {
  @Input() host: string;
  @Input() guest: string;
  @Input() category: string;
  @Input() matchLimit: string;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  acceptClicked() {
    this.modalController.dismiss(MatchSessionStatus.Accepted);
  }

  declineClicked() {
    this.modalController.dismiss(MatchSessionStatus.Declined);
  }
}
