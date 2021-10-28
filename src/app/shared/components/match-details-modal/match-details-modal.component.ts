import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export enum MatchDetailsDisplayMode {
  Info,
  Accept,
  Continue,
  Summary,
}

export enum MatchDetailsModalActions {
  Continue,
  Leave,
  Accept,
  Decline,
  Nothing,
}

@Component({
  templateUrl: 'match-details-modal.component.html',
  styleUrls: ['match-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchDetailsModal {
  @Input() displayMode: MatchDetailsDisplayMode;
  @Input() host: string;
  @Input() guest: string;
  @Input() region: string;
  @Input() category: string;
  @Input() matchLimit: string;
  @Input() accepted: string;
  @Input() id: string;

  readonly matchDetailsDisplayMode = MatchDetailsDisplayMode;
  readonly matchDetailsModalActions = MatchDetailsModalActions;

  constructor(private modalController: ModalController) {}

  closeModal(event: MatchDetailsModalActions) {
    this.modalController.dismiss({
      event,
      id: this.id,
    });
  }
}
