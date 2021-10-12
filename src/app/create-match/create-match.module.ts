import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CreateMatchComponent } from './create-match.component';
import { CreateMatchRoutingModule } from './create-match.module.routing';

@NgModule({
  declarations: [CreateMatchComponent],
  imports: [CommonModule, IonicModule, CreateMatchRoutingModule],
})
export class CreateMatchModule {
  constructor() {}
}
