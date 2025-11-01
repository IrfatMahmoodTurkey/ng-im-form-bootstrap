import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPreviewComponent } from './form-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APICallService } from '../services/api-call.service';
import { UISharedModule } from '../../shared/ui-shared.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UISharedModule],
  declarations: [FormPreviewComponent],
  exports: [FormPreviewComponent],
  providers: [APICallService],
})
export class FormPreviewModule {}
