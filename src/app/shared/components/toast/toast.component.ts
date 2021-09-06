import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

export enum ToastPosition {
  Top = 'top',
  Bottom = 'bottom',
}

@Component({
  selector: 'filmder-toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponentShared implements AfterViewInit {
  @Input() duration = 3000;
  @Input() position: string = ToastPosition.Top;
  @ViewChild('toastContainer') toastContainer: ElementRef;
  @ViewChild('toastContent') toastContent: ElementRef;
  message: string;
  timerID: NodeJS.Timeout;

  constructor(private cd: ChangeDetectorRef, private element: ElementRef) {}

  ngAfterViewInit(): void {
    console.log('toastContainer: ', this.toastContainer.nativeElement);
    console.log('this.position: ', this.position);
    if (this.position === ToastPosition.Top) {
      this.toastContainer.nativeElement.style.top = 0;
      this.toastContent.nativeElement.style.borderRadius = '0px 0px 15px 15px';
    } else {
      this.toastContainer.nativeElement.style.bottom = 0;
      this.toastContent.nativeElement.style.borderRadius = '15px 15px 0px 0px ';
    }
  }

  @HostListener('click')
  clickListener() {
    clearTimeout(this.timerID);
    this.hideToast();
  }

  displayToast(message: string) {
    console.log('displayToast');
    this.message = message;
    this.cd.detectChanges();
    this.toastContainer.nativeElement.style.display = 'flex';
    this.timerID = setTimeout(() => {
      this.hideToast();
    }, this.duration);
  }

  hideToast() {
    this.toastContainer.nativeElement.style.display = 'none';
  }
}
