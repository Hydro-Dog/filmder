import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatchDetailsModalActions } from '@src/app/shared/components/match-details-modal/match-details-modal.component';

@Component({
  templateUrl: 'active-match-details.component.html',
  styleUrls: ['active-match-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveMatchDetailsModal {
  @Input() host: string;
  @Input() guest: string;
  @Input() category: string;
  @Input() matchLimit: string;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  continue() {
    this.modalController.dismiss(MatchDetailsModalActions.Continue);
  }

  leaveSession() {
    this.modalController.dismiss(MatchDetailsModalActions.Leave);
  }
}
