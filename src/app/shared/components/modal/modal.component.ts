import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

interface AlertData {
  value: any;
}

enum AlertConfirmRoles {
  Ok = 'ok',
  Cancel = 'cancel',
}

export interface AlertConfirm {
  data: AlertData;
  role: AlertConfirmRoles;
}

@Component({
  selector: 'filmder-alert',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponentShared {
  constructor(public modalController: ModalController) {}

  //  async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ModalPage,
  //     cssClass: 'my-custom-class'
  //   });
  //   return await modal.present();
  // }
}
