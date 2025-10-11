import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder.component';
import { FieldSelectionSidePanelComponent } from './field-selection-sidepanel/field-selection-sidepanel.component';
import { SectionPropertiesSidepanelComponent } from './section-properties-sidepanel/section-properties-sidepanel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextboxPropertiesSidepanelComponent } from './textbox-properties-sidepanel/textbox-properties-sidepanel.component';
import { TextareaPropertiesSidepanelComponent } from './textarea-properties-sidepanel/textarea-properties-sidepanel.component';
import { FilefieldPropertiesSidepanelComponent } from './filefield-properties-sidepanel/filefield-properties-sidepanel.component';
import { SelectboxPropertiesSidepanelComponent } from './selectbox-properties-sidepanel/selectbox-properties-sidepanel.component';
import { CheckboxPropertiesSidepanelComponent } from './checkbox-properties-sidepanel/checkbox-properties-sidepanel.component';
import { RadioButtonGroupPropertiesSidepanelComponent } from './radio-button-group-properties-sidepanel/radio-button-group-properties-sidepanel.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    FormBuilderComponent,
    FieldSelectionSidePanelComponent,
    SectionPropertiesSidepanelComponent,
    TextboxPropertiesSidepanelComponent,
    TextareaPropertiesSidepanelComponent,
    FilefieldPropertiesSidepanelComponent,
    SelectboxPropertiesSidepanelComponent,
    CheckboxPropertiesSidepanelComponent,
    RadioButtonGroupPropertiesSidepanelComponent,
  ],
  exports: [FormBuilderComponent],
})
export class FormBuilderModule {}
