import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPreviewPageComponent } from './form-preview-page.component';
import { FormPreviewModule } from '../../modules/form-preview/form-preview.module';

@NgModule({
  imports: [CommonModule, FormPreviewModule],
  declarations: [FormPreviewPageComponent],
})
export class FormPreviewPageModule {}
