import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InviteService } from './invite.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page implements OnInit {
  constructor(private inviteService: InviteService) {}

  ngOnInit(): void {
    this.inviteService.msgToServer('Hi');
    this.inviteService.message$.subscribe((message) =>
      console.log('message: ', message)
    );
  }
}
