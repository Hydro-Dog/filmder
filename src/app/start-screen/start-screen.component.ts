import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: 'start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartScreenComponent implements OnInit {
  readonly vkontakteAuthUrl = `${environment.apiUrl}/vkontakte`;
  readonly googleAuthUrl = `${environment.apiUrl}/google`;
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  goExternal(resource: 'google' | 'vkontakte') {
    window.location.href = `${environment.apiUrl}/${resource}`;
  }

  async googleSignIn() {}
}
