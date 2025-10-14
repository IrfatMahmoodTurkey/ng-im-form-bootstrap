import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPreviewComponent } from './form-preview.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormPreviewComponent],
  exports: [FormPreviewComponent],
})
export class FormPreviewModule {}
