import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/state/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService
      .mockApiRequest()
      .subscribe((mockApiRequest) =>
        console.log('mockApiRequest: ', mockApiRequest)
      );
  }
}
