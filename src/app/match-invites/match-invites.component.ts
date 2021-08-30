import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  templateUrl: 'match-invites.component.html',
  styleUrls: ['match-invites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchInvitesComponent implements OnDestroy {
  @ViewChild(MatchInvitesComponent)
  myComponentRef: ComponentRef<MatchInvitesComponent>;
  constructor(
    private navController: NavController,
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef
  ) {}

  @HostListener('unloaded')
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.elementRef.nativeElement.remove();
  }

  navigateBack() {
    this.navController.navigateBack('/tabs/tab1');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave myComponentRef: ', this.viewContainer);
    // this.elementRef.nativeElement.remove();
    // this.myComponentRef.destroy();
    this.ngOnDestroy();
  }
}
