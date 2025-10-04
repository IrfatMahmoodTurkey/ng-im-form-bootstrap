import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder.component';
import { FieldSelectionSidePanelComponent } from './field-selection-sidepanel/field-selection-sidepanel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FormBuilderComponent, FieldSelectionSidePanelComponent],
  exports: [FormBuilderComponent],
})
export class FormBuilderModule {}
