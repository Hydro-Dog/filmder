import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private router: Router) {}

  getSegmentValue() {
    if (this.router.url.includes('tab1')) return 'tab1';
    if (this.router.url.includes('tab2')) return 'tab2';
    if (this.router.url.includes('tab3')) return 'tab3';
  }
}
