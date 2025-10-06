import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder.component';
import { FieldSelectionSidePanelComponent } from './field-selection-sidepanel/field-selection-sidepanel.component';
import { SectionPropertiesSidepanelComponent } from './section-properties-sidepanel/section-properties-sidepanel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextboxPropertiesSidepanelComponent } from './textbox-properties-sidepanel/textbox-properties-sidepanel.component';
import { TextareaPropertiesSidepanelComponent } from './textarea-properties-sidepanel/textarea-properties-sidepanel.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    FormBuilderComponent,
    FieldSelectionSidePanelComponent,
    SectionPropertiesSidepanelComponent,
    TextboxPropertiesSidepanelComponent,
    TextareaPropertiesSidepanelComponent,
  ],
  exports: [FormBuilderComponent],
})
export class FormBuilderModule {}
