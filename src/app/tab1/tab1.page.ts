import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { MatchSessionFacade } from '../data-access/match-session/match-session.facade';
import { UserFacade } from '../data-access/user/user.facade';
import { InviteService } from './invite.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page implements OnInit, OnDestroy {
  destroy$ = new Subject();

  constructor(private inviteService: InviteService) {}

  ngOnInit(): void {
    this.inviteService.msgToServer('Hi');
    this.inviteService.message$.subscribe((message) =>
      console.log('message: ', message)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
