import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export enum MatchDetailsDisplayMode {
  Info,
  Accept,
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

  constructor(private modalController: ModalController) {}

  closeModal(accepted?: boolean) {
    this.modalController.dismiss({
      accepted,
      id: this.id,
    });
  }
}
