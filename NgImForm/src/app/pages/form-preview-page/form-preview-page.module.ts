import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPreviewPageComponent } from './form-preview-page.component';
import { FormPreviewModule } from '../../modules/form-preview/form-preview.module';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormPreviewModule, RouterLink],
  declarations: [FormPreviewPageComponent],
})
export class FormPreviewPageModule {}
