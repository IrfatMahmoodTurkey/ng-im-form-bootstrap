import { Component, OnInit } from '@angular/core';
import {
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
} from '../../models/horizontal-form.model';
import { APIMethodsEnum } from '../../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../../enums/send-body-types.enum';
import { FIELDS } from '../../constants/field-types.constant';
import { sectionHelpers } from '../../helpers/section.helper';
import { textboxHelpers } from '../../helpers/textbox.helper';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  fields: string[] = FIELDS;

  horizontalForm: IHorizontalFormModel = {
    checkValidations: true,
    isResetButtonAvailable: true,
    submitAPIUrl: '',
    method: APIMethodsEnum.POST,
    sendBodyAs: SendBodyTypesEnum.JSON,
    authorization: {
      willAuthorize: false,
      bearerTokenStorageKey: '',
    },
    responseMessages: {
      onSuccess: 'Success',
      onFailed: 'Failed',
    },
    sections: [],
  };

  isFieldSelectionSidePanelOpen: boolean = false;
  selectedSectionId: string | undefined;

  isSectionPropertiesSidePanelOpen: boolean = false;
  selectedForSectionPropertiesUpdate: IHorizonatalFormSectionModel | undefined;

  constructor() {}

  ngOnInit() {}

  addSection(): void {
    this.horizontalForm = sectionHelpers.addSection(this.horizontalForm);
  }

  removeSection(id: string): void {
    let horizontalForm: IHorizontalFormModel | null =
      sectionHelpers.removeSection(id, this.horizontalForm);

    if (horizontalForm) {
      this.horizontalForm = horizontalForm;
    }
  }

  viewFieldSelectionSidePanel(sectionId: string): void {
    this.selectedSectionId = sectionId;
    this.isFieldSelectionSidePanelOpen = true;
  }

  hideFieldSelectionSidePanel(): void {
    this.isFieldSelectionSidePanelOpen = false;
  }

  viewSectionPropertiesSidePanel(id: string): void {
    this.selectedForSectionPropertiesUpdate = this.horizontalForm.sections.find(
      (value: IHorizonatalFormSectionModel) => value.id === id
    );

    this.isSectionPropertiesSidePanelOpen = true;
  }

  hideSectionPropertiesSidePanel(): void {
    this.isSectionPropertiesSidePanelOpen = false;
  }

  addField(type: string): void {
    if (type === this.fields[0]) {
      let horizontalForm: IHorizontalFormModel | null =
        textboxHelpers.addTextbox(this.selectedSectionId, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    }
  }

  removeField(type: string, sectionId: string, id: string): void {
    if (type === this.fields[0]) {
      let horizontalForm: IHorizontalFormModel | null =
        textboxHelpers.removeTextbox(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    }
  }
}
