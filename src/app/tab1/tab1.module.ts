import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MatchInvitesModule } from '../match-invites/match-invites.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    MatchInvitesModule,
  ],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
