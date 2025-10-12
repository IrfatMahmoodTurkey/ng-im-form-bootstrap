import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderPageComponent } from './form-builder-page.component';
import { FormBuilderModule } from '../../modules/form-builder/form-builder.module';

@NgModule({
  imports: [CommonModule, FormBuilderModule],
  declarations: [FormBuilderPageComponent],
})
export class FormBuilderPageModule {}
