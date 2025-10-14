import { NgModule } from '@angular/core';
import { SpinnerDisabledButtonComponent } from './spinner-disabled-button/spinner-disabled-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [SpinnerDisabledButtonComponent],
  exports: [SpinnerDisabledButtonComponent],
})
export class UIModule {}
