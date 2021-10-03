import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { from, Subject } from 'rxjs';
import { InviteService } from '../data-layer/match-session/invite.service';
import { StorageService, USER_ID } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page implements OnInit, OnDestroy {
  destroy$ = new Subject();

  constructor(
    private inviteService: InviteService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const id = await this.storageService.getValue(USER_ID);
    console.log('id: ', id);
    this.inviteService.msgToServer('request_user_match_sessions', { id });
    this.inviteService.message$.subscribe((message) =>
      console.log('message: ', message)
    );
    this.inviteService.socketOn$.subscribe((message) =>
      console.log('message: ', message)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
