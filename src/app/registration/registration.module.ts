import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routimg.module';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, RegistrationRoutingModule],
})
export class RegistrationModule {}
