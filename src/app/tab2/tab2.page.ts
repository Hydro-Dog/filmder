import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { UserFacade } from '../data-layer/user/user.facade';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  readonly currentMatchSession$ = this.userFacade.selectUser$.pipe(
    filter(Boolean),
    map(({ currentMatchSession }) => currentMatchSession)
  );

  get hasActiveMatches() {
    return this.currentMatchSession$;
  }

  constructor(private userFacade: UserFacade) {}
}
