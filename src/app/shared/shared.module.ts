import { NgModule } from '@angular/core';
import { AlertExample } from './components/modal/modal.component';
import { ToastComponentShared } from './components/toast/toast.component';

const components = [ToastComponentShared, AlertExample];

@NgModule({ declarations: components, exports: components })
export class SharedModule {}
