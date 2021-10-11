import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FilmCardComponent } from '../film-card/film-card.component';
import { CurrentMatchComponent } from './current-match.component';
import { CurrentMatchRoutingModule } from './current-match.routing.module';

@NgModule({
  declarations: [CurrentMatchComponent, FilmCardComponent],
  imports: [CommonModule, IonicModule, CurrentMatchRoutingModule],
  exports: [CurrentMatchComponent],
})
export class CurrentMatchModule {}
