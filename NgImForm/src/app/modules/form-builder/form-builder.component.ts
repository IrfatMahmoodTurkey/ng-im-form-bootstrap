import { Component, OnInit } from '@angular/core';
import {
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
  ISelectBoxModel,
  ITextBoxModel,
} from '../../models/horizontal-form.model';
import { APIMethodsEnum } from '../../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../../enums/send-body-types.enum';
import { FIELDS } from '../../constants/field-types.constant';

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

  constructor() {}

  ngOnInit() {}

  addSection(): void {
    const generatedId: string = String(Date.now());

    this.horizontalForm.sections.push({
      id: generatedId,
      title: 'Section Title',
      subTitle: 'Section Subtitle',
      class: 'section-class',
      headerClass: 'section-header-class',
      bodyClass: 'section-body-class',
      elements: [],
    });
  }

  removeSection(id: string): void {
    if (this.horizontalForm.sections.length <= 0) {
      return;
    }

    const indexOf: number = this.horizontalForm.sections.findIndex(
      (value: IHorizonatalFormSectionModel) => value.id === id
    );

    if (indexOf < 0) {
      return;
    }

    this.horizontalForm.sections.splice(indexOf, 1);
  }

  viewFieldSelectionSidePanel(sectionId: string): void {
    this.selectedSectionId = sectionId;
    this.isFieldSelectionSidePanelOpen = true;
  }

  hideFieldSelectionSidePanel(): void {
    this.isFieldSelectionSidePanelOpen = false;
  }

  addField(type: string): void {
    if (type === this.fields[0]) {
      this.addTextbox();
    }
  }

  addTextbox(): void {
    if (!this.selectedSectionId) {
      return;
    }

    let toModifySection: IHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: IHorizonatalFormSectionModel) =>
          value.id === this.selectedSectionId
      );

    if (!toModifySection) {
      return;
    }

    const generatedId: string = String(Date.now());

    const order: number = toModifySection.elements.length;

    const toAddTextBox: ITextBoxModel = {
      id: generatedId,
      order: order + 1,
      label: `Input Field ${order + 1}`,
      type: 'text',
      class: 'form-control',
      placeholder: `Input Field ${order + 1}`,
      userDefinedId: `field-${order + 1}`,
      value: '',
      isReadOnly: false,
      isHidden: false,
      isRequired: false,
      requiredMessage: null,
      validations: null,
      regexValidation: null,
    };

    toModifySection.elements.push({
      type: this.fields[0],
      textBoxComponent: toAddTextBox,
    });
  }
}
