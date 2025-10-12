import { NgModule } from '@angular/core';
import { SpinnerDisabledButtonComponent } from './spinner-disabled-button/spinner-disabled-button.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule],
  declarations: [SpinnerDisabledButtonComponent],
  exports: [SpinnerDisabledButtonComponent],
})
export class UIModule {}
