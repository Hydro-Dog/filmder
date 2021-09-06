import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'filmder-picker',
  templateUrl: 'picker.component.html',
  styleUrls: ['./picker.component.scss'],
})
export class PickerComponentShared {
  animals: string[] = ['Tiger', 'Lion', 'Elephant', 'Fox', 'Wolf'];
  constructor(private pickerController: PickerController) {}

  async showPicker() {
    let options: PickerOptions = {
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
          name: 'Animals',
          options: this.getColumnOptions(),
        },
      ],
    };

    let picker = await this.pickerController.create(options);
    picker.present();
  }

  getColumnOptions() {
    let options = [];
    this.animals.forEach((x) => {
      options.push({ text: x, value: x });
    });
    return options;
  }
}
