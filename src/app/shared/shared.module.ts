import { NgModule } from '@angular/core';
import { ModalComponentShared } from './components/modal/modal.component';
import { PickerComponentShared } from './components/picker/picker.component';
import { ToastComponentShared } from './components/toast/toast.component';
import { StarCasePipe } from './pipes/start-case.pipe';

const components = [
  ToastComponentShared,
  ModalComponentShared,
  PickerComponentShared,
  StarCasePipe,
];

@NgModule({ declarations: components, exports: components })
export class SharedModule {}
