import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AuthEffects } from './auth/state/auth.effects';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { FormsModule } from '@angular/forms';
import { UserEffects } from './data-layers/user/user.effects';
import { FilmEffects } from './data-layers/film/film.effects';
import { ErrorInterceptor } from './auth/error.interceptor';
import { GameModesEffects } from './data-layers/game-mode/game-mode.effects';
import { AuthInterceptor } from './auth/token.interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      rippleEffect: false,
    }),
    IonicStorageModule.forRoot(),
    AkitaNgEffectsModule.forFeature([
      AuthEffects,
      UserEffects,
      FilmEffects,
      GameModesEffects,
    ]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AkitaNgRouterStoreModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
