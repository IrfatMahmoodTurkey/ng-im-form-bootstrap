import { Component, OnInit } from '@angular/core';
import {
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
  ITextBoxModel,
} from '../../models/horizontal-form.model';
import { APIMethodsEnum } from '../../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../../enums/send-body-types.enum';
import { FIELDS } from '../../constants/field-types.constant';
import { sectionHelpers } from '../../helpers/section.helper';
import { textboxHelpers } from '../../helpers/textbox.helper';
import { textareaHelpers } from '../../helpers/textarea.helper';
import { ISectionPropertiesInputEmitModel } from '../../models/section-properties-input-emit.model';
import { ITextboxPropertiesInputEmitModel } from '../../models/textbox-properties-input-emit.model';
import { ITextareaPropertiesInputEmitModel } from '../../models/textarea-properties-input-emit.model';

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
  selectedForSectionPropertiesUpdate:
    | ISectionPropertiesInputEmitModel
    | undefined;

  isTextBoxPropertiesSidePanelOpen: boolean = false;
  selectedForTextboxPropertiesUpdate:
    | ITextboxPropertiesInputEmitModel
    | undefined;

  isTextAreaPropertiesSidePanelOpen: boolean = false;
  selectedForTextareaPropertiesUpdate:
    | ITextareaPropertiesInputEmitModel
    | undefined;

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
    let properties: IHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: IHorizonatalFormSectionModel) => value.id === id
      );

    if (!properties) {
      return;
    }

    this.selectedForSectionPropertiesUpdate = {
      sectionId: id,
      properties: properties,
    };

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
    } else if (type === this.fields[1]) {
      let horizontalForm: IHorizontalFormModel | null =
        textareaHelpers.addTextArea(
          this.selectedSectionId,
          this.horizontalForm
        );

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
    } else if (type === this.fields[1]) {
      let horizontalForm: IHorizontalFormModel | null =
        textareaHelpers.removeTextArea(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    }
  }

  saveSectionProperties(emitted: ISectionPropertiesInputEmitModel): void {
    const indexOf: number = this.horizontalForm.sections.findIndex(
      (value: IHorizonatalFormSectionModel) => value.id === emitted.sectionId
    );

    if (indexOf < 0) {
      return;
    }

    this.horizontalForm.sections[indexOf] = emitted.properties;
  }

  viewTextBoxPropertiesSidePanel(sectionId: string, textboxId: string): void {
    let properties: IHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: IHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: IElementModel | undefined = properties.elements.find(
      (value: IElementModel) =>
        value.type === FIELDS[0] &&
        value.textBoxComponent &&
        value.textBoxComponent.id === textboxId
    );

    if (!element || !element.textBoxComponent) {
      return;
    }

    this.selectedForTextboxPropertiesUpdate = {
      sectionId,
      textboxId,
      properties: element.textBoxComponent,
    };

    this.isTextBoxPropertiesSidePanelOpen = true;
  }

  hideTextBoxPropertiesSidePanel(): void {
    this.isTextBoxPropertiesSidePanelOpen = false;
  }

  saveTextboxProperties(emitted: ITextboxPropertiesInputEmitModel): void {
    let foundSectionIndex: number = this.horizontalForm.sections.findIndex(
      (value: IHorizonatalFormSectionModel) => value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundTextboxIndex: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: IElementModel) =>
        value.type === FIELDS[0] &&
        value.textBoxComponent &&
        value.textBoxComponent.id === emitted.textboxId
    );

    if (foundTextboxIndex < 0) {
      return;
    }

    this.horizontalForm.sections[foundSectionIndex].elements[
      foundTextboxIndex
    ].textBoxComponent = emitted.properties;
  }

  viewTextAreaPropertiesSidePanel(sectionId: string, textareaId: string): void {
    let properties: IHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: IHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: IElementModel | undefined = properties.elements.find(
      (value: IElementModel) =>
        value.type === FIELDS[1] &&
        value.textAreaComponent &&
        value.textAreaComponent.id === textareaId
    );

    if (!element || !element.textAreaComponent) {
      return;
    }

    this.selectedForTextareaPropertiesUpdate = {
      sectionId,
      textareaId,
      properties: element.textAreaComponent,
    };

    this.isTextAreaPropertiesSidePanelOpen = true;
  }

  hideTextAreaPropertiesSidePanel(): void {
    this.isTextAreaPropertiesSidePanelOpen = false;
  }

  saveTextareaProperties(emitted: ITextareaPropertiesInputEmitModel): void {
    let foundSectionIndex: number = this.horizontalForm.sections.findIndex(
      (value: IHorizonatalFormSectionModel) => value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundTextboxIndex: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: IElementModel) =>
        value.type === FIELDS[1] &&
        value.textAreaComponent &&
        value.textAreaComponent.id === emitted.textareaId
    );

    if (foundTextboxIndex < 0) {
      return;
    }

    this.horizontalForm.sections[foundSectionIndex].elements[
      foundTextboxIndex
    ].textAreaComponent = emitted.properties;
  }
}
