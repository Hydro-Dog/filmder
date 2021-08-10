import { NgModule } from '@angular/core';
import { ToastComponentShared } from './components/toast-component/toast.component';

const components = [ToastComponentShared];

@NgModule({ declarations: components, exports: components })
export class SharedModule {}
