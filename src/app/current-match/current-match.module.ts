import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CurrentMatchComponent } from './current-match.component';
import { CurrentMatchRoutingModule } from './current-match.routing.module';

@NgModule({
  declarations: [CurrentMatchComponent],
  imports: [CommonModule, IonicModule, CurrentMatchRoutingModule],
  exports: [CurrentMatchComponent],
})
export class CurrentMatchModule {}
