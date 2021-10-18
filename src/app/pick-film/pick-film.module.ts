import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FilmCardShared } from '../shared/components/film-card/film-card.component';
import { PickFilmComponent } from './pick-film.component';
import { PickFilmRoutingModule } from './pick-film.module.routing';

@NgModule({
  declarations: [PickFilmComponent, FilmCardShared],
  imports: [CommonModule, IonicModule, PickFilmRoutingModule],
})
export class PickFilmModule {}
