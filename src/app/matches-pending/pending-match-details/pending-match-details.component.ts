import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatchDetailsModalActions } from '@src/app/shared/components/match-details-modal/match-details-modal.component';

@Component({
  templateUrl: 'pending-match-details.component.html',
  styleUrls: ['pending-match-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingMatchDetailsModal {
  @Input() host: string;
  @Input() guest: string;
  @Input() category: string;
  @Input() matchLimit: string;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  leaveSession() {
    this.modalController.dismiss(MatchDetailsModalActions.Leave);
  }
}
