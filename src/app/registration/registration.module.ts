import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routimg.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
  ],
})
export class RegistrationModule {}
