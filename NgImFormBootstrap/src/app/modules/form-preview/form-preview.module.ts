import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPreviewComponent } from './form-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APICallService } from '../services/api-call.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormPreviewComponent],
  exports: [FormPreviewComponent],
  providers: [APICallService],
})
export class FormPreviewModule {}
