import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { OverlayEventDetail, PickerOptions } from '@ionic/core';

export interface PickerOptionsInterface {
  text: string;
  value: string;
}

@Component({
  selector: 'filmder-picker',
  templateUrl: 'picker.component.html',
  styleUrls: ['./picker.component.scss'],
})
export class PickerComponentShared {
  animals: string[] = ['Tiger', 'Lion', 'Elephant', 'Fox', 'Wolf'];
  constructor(private pickerController: PickerController) {}

  async showPicker(
    options: PickerOptionsInterface[]
  ): Promise<OverlayEventDetail<any>> {
    let pickerOptions: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            console.log(value);
          },
        },
      ],
      columns: [
        {
          name: 'Regions',
          options,
        },
      ],
    };

    let picker = await this.pickerController.create(pickerOptions);
    picker.present();
    return await picker.onDidDismiss();
  }
}
