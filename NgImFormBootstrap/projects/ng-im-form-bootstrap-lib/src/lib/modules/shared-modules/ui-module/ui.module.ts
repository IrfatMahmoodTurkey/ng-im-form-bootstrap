import { NgModule } from '@angular/core';
import { SpinnerDisabledButtonComponent } from './spinner-disabled-button/spinner-disabled-button.component';
import { CommonModule } from '@angular/common';
import { ButtonSpinnerComponent } from './button-spinner/button-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SpinnerDisabledButtonComponent, ButtonSpinnerComponent],
  exports: [SpinnerDisabledButtonComponent, ButtonSpinnerComponent],
})
export class UIModule {}
