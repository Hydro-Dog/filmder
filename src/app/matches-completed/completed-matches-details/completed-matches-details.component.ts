import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Film } from '@src/app/data-layer/film/film.models';
import { MatchDetailsModalActions } from '@src/app/shared/components/match-details-modal/match-details-modal.component';

@Component({
  templateUrl: 'completed-matches-details.component.html',
  styleUrls: ['completed-matches-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedMatchesDetailsModal {
  @Input() host: string;
  @Input() guest: string;
  @Input() category: string;
  @Input() matchedMovies: string[];
  @Input() matchLimit: string;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  acceptClicked() {
    this.modalController.dismiss(MatchDetailsModalActions.Accept);
  }

  declineClicked() {
    this.modalController.dismiss(MatchDetailsModalActions.Decline);
  }
}
