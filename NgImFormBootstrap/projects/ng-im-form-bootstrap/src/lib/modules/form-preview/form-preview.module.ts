import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPreviewComponent } from './form-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APICallService } from '../services/api-call.service';
import { UIModule } from '../shared-modules/ui-module/ui.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UIModule],
  declarations: [FormPreviewComponent],
  exports: [FormPreviewComponent],
  providers: [
    APICallService,
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor },
  ],
})
export class FormPreviewModule {}
