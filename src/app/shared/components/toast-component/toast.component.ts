import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'filmder-toast-example',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponentShared {
  @Input() duration = 2000;
  @ViewChild('toastContainer') toastContainer: ElementRef;
  message: string;

  constructor(private cd: ChangeDetectorRef) {}

  displayToast(message: string) {
    this.message = message;
    this.cd.detectChanges();
    this.toastContainer.nativeElement.style.display = 'flex';
    setTimeout(() => {
      this.hideToast();
    }, this.duration);
  }

  hideToast() {
    this.toastContainer.nativeElement.style.display = 'none';
  }
}
