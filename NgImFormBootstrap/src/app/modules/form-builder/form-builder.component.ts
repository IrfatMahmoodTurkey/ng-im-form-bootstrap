import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
} from '../../models/horizontal-form.model';
import { APIMethodsEnum } from '../../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../../enums/send-body-types.enum';
import { FIELDS } from '../../constants/field-types.constant';
import { sectionHelpers } from '../../helpers/section.helper';
import { textboxHelpers } from '../../helpers/textbox.helper';
import { textareaHelpers } from '../../helpers/textarea.helper';
import { filefieldHelpers } from '../../helpers/filefield.helper';
import { selectboxHelpers } from '../../helpers/selectbox.helper';
import { checkboxHelpers } from '../../helpers/checkbox.helper';
import { radioButtonGroupHelpers } from '../../helpers/radio-button-group.helper';
import { imageBoxHelpers } from '../../helpers/image-box.helper';
import { textHelpers } from '../../helpers/text.helper';
import { ISectionPropertiesInputEmitModel } from '../../models/section-properties-input-emit.model';
import { ITextboxPropertiesInputEmitModel } from '../../models/textbox-properties-input-emit.model';
import { ITextareaPropertiesInputEmitModel } from '../../models/textarea-properties-input-emit.model';
import { IFileFieldPropertiesInputEmitModel } from '../../models/filefield-properties-input-emit.model';
import { ISelectboxPropertiesInputEmitModel } from '../../models/selectbox-properties-input-emit.model';
import { ICheckboxPropertiesInputEmitModel } from '../../models/checkbox-properties-input-emit.model';
import { IRadioButtonGroupPropertiesInputEmitModel } from '../../models/radio-button-group-properties-input-emit.model';
import { ALIGNMENTS } from '../../constants/alignments.constant';
import { IImageBoxPropertiesInputEmitModel } from '../../models/image-box-properties-input-emit.model';
import { ITextPropertiesInputEmitModel } from '../../models/text-properties-input-emit.model';

@Component({
  selector: 'ng-im-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  @Input() preset: INgImHorizontalFormModel | undefined | null;
  @Output() publishFormEvent: EventEmitter<INgImHorizontalFormModel> =
    new EventEmitter();

  @Input() isPublishing: boolean = false;

  alignments: string[] = ALIGNMENTS;
  fields: string[] = FIELDS;

  horizontalForm: INgImHorizontalFormModel = {
    checkValidations: true,
    isResetButtonAvailable: true,
    submitAPIUrl: '',
    method: APIMethodsEnum.POST,
    sendBodyAs: SendBodyTypesEnum.JSON,
    responseMessages: {
      onSuccess: {
        title: 'Success',
        subTitle: '',
      },
      onFailed: {
        title: 'Failed',
        subTitle: '',
      },
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

  isFileFieldPropertiesSidePanelOpen: boolean = false;
  selectedForFileFieldPropertiesUpdate:
    | IFileFieldPropertiesInputEmitModel
    | undefined;

  isSelectboxPropertiesSidePanelOpen: boolean = false;
  selectedForSelectboxPropertiesUpdate:
    | ISelectboxPropertiesInputEmitModel
    | undefined;

  isCheckboxPropertiesSidePanelOpen: boolean = false;
  selectedForCheckboxPropertiesUpdate:
    | ICheckboxPropertiesInputEmitModel
    | undefined;

  isRadioButtonGroupPropertiesSidePanelOpen: boolean = false;
  selectedForRadioButtonGroupPropertiesUpdate:
    | IRadioButtonGroupPropertiesInputEmitModel
    | undefined;

  isImageboxPropertiesSidePanelOpen: boolean = false;
  selectedForImageboxPropertiesUpdate:
    | IImageBoxPropertiesInputEmitModel
    | undefined;

  isTextPropertiesSidePanelOpen: boolean = false;
  selectedForTextPropertiesUpdate: ITextPropertiesInputEmitModel | undefined;

  isFormPropertiesSidePanelOpen: boolean = false;

  draggedSectionIndex: number | null = null;
  replaceSectionIndex: number | null = null;

  draggedField: { sectionIndex: number; fieldIndex: number } | null = null;
  replaceField: { sectionIndex: number; fieldIndex: number } | null = null;

  constructor() {}

  ngOnInit() {
    if (this.preset) {
      this.horizontalForm = this.preset;
    }
  }

  addSection(): void {
    this.horizontalForm = sectionHelpers.addSection(this.horizontalForm);
  }

  removeSection(id: string): void {
    let horizontalForm: INgImHorizontalFormModel | null =
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
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === id
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
      let horizontalForm: INgImHorizontalFormModel | null =
        textboxHelpers.addTextbox(this.selectedSectionId, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[1]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        textareaHelpers.addTextArea(
          this.selectedSectionId,
          this.horizontalForm
        );

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[2]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        filefieldHelpers.addFilefield(
          this.selectedSectionId,
          this.horizontalForm
        );

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[3]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        selectboxHelpers.addSelectbox(
          this.selectedSectionId,
          this.horizontalForm
        );

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[4]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        checkboxHelpers.addCheckbox(
          this.selectedSectionId,
          this.horizontalForm
        );

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[5]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        radioButtonGroupHelpers.addRadioButtonGroup(
          this.selectedSectionId,
          this.horizontalForm
        );

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[6]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        imageBoxHelpers.addImageBoxGroup(
          this.selectedSectionId,
          this.horizontalForm
        );

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[7]) {
      let horizontalForm: INgImHorizontalFormModel | null = textHelpers.addText(
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
      let horizontalForm: INgImHorizontalFormModel | null =
        textboxHelpers.removeTextbox(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[1]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        textareaHelpers.removeTextArea(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[2]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        filefieldHelpers.removeFilefield(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[3]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        selectboxHelpers.removeSelectBox(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[4]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        checkboxHelpers.removeCheckBox(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[5]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        radioButtonGroupHelpers.removeRadioButtonGroup(
          sectionId,
          id,
          this.horizontalForm
        );

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[6]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        imageBoxHelpers.removeImageBox(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    } else if (type === this.fields[7]) {
      let horizontalForm: INgImHorizontalFormModel | null =
        textHelpers.removeText(sectionId, id, this.horizontalForm);

      if (horizontalForm) {
        this.horizontalForm = horizontalForm;
      }
    }
  }

  saveSectionProperties(emitted: ISectionPropertiesInputEmitModel): void {
    const indexOf: number = this.horizontalForm.sections.findIndex(
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (indexOf < 0) {
      return;
    }

    this.horizontalForm.sections[indexOf] = emitted.properties;
  }

  viewTextBoxPropertiesSidePanel(sectionId: string, textboxId: string): void {
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: INgImFormElementModel | undefined = properties.elements.find(
      (value: INgImFormElementModel) =>
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
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundTextboxIndex: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: INgImFormElementModel) =>
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
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: INgImFormElementModel | undefined = properties.elements.find(
      (value: INgImFormElementModel) =>
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
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundTextboxIndex: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: INgImFormElementModel) =>
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

  viewFileFieldPropertiesSidePanel(
    sectionId: string,
    fileFieldId: string
  ): void {
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: INgImFormElementModel | undefined = properties.elements.find(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[2] &&
        value.fileFieldComponent &&
        value.fileFieldComponent.id === fileFieldId
    );

    if (!element || !element.fileFieldComponent) {
      return;
    }

    this.selectedForFileFieldPropertiesUpdate = {
      sectionId,
      fileFieldId,
      properties: element.fileFieldComponent,
    };

    this.isFileFieldPropertiesSidePanelOpen = true;
  }

  hideFileFieldPropertiesSidePanel(): void {
    this.isFileFieldPropertiesSidePanelOpen = false;
  }

  saveFileFieldProperties(emitted: IFileFieldPropertiesInputEmitModel): void {
    let foundSectionIndex: number = this.horizontalForm.sections.findIndex(
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundFileFieldIndex: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[2] &&
        value.fileFieldComponent &&
        value.fileFieldComponent.id === emitted.fileFieldId
    );

    if (foundFileFieldIndex < 0) {
      return;
    }

    this.horizontalForm.sections[foundSectionIndex].elements[
      foundFileFieldIndex
    ].fileFieldComponent = emitted.properties;
  }

  viewSelectboxPropertiesSidePanel(
    sectionId: string,
    selectboxId: string
  ): void {
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: INgImFormElementModel | undefined = properties.elements.find(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[3] &&
        value.selectBoxComponent &&
        value.selectBoxComponent.id === selectboxId
    );

    if (!element || !element.selectBoxComponent) {
      return;
    }

    this.selectedForSelectboxPropertiesUpdate = {
      sectionId,
      selectBoxId: selectboxId,
      properties: element.selectBoxComponent,
    };

    this.isSelectboxPropertiesSidePanelOpen = true;
  }

  hideSelectboxPropertiesSidePanel(): void {
    this.isSelectboxPropertiesSidePanelOpen = false;
  }

  saveSelectboxProperties(emitted: ISelectboxPropertiesInputEmitModel): void {
    let foundSectionIndex: number = this.horizontalForm.sections.findIndex(
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundSelectboxIndex: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[3] &&
        value.selectBoxComponent &&
        value.selectBoxComponent.id === emitted.selectBoxId
    );

    if (foundSelectboxIndex < 0) {
      return;
    }

    this.horizontalForm.sections[foundSectionIndex].elements[
      foundSelectboxIndex
    ].selectBoxComponent = emitted.properties;
  }

  viewCheckboxPropertiesSidePanel(sectionId: string, checkboxId: string): void {
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: INgImFormElementModel | undefined = properties.elements.find(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[4] &&
        value.checkBoxComponent &&
        value.checkBoxComponent.id === checkboxId
    );

    if (!element || !element.checkBoxComponent) {
      return;
    }

    this.selectedForCheckboxPropertiesUpdate = {
      sectionId,
      checkboxId: checkboxId,
      properties: element.checkBoxComponent,
    };

    this.isCheckboxPropertiesSidePanelOpen = true;
  }

  hideCheckboxPropertiesSidePanel(): void {
    this.isCheckboxPropertiesSidePanelOpen = false;
  }

  saveCheckboxProperties(emitted: ICheckboxPropertiesInputEmitModel): void {
    let foundSectionIndex: number = this.horizontalForm.sections.findIndex(
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundCheckboxIndex: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[4] &&
        value.checkBoxComponent &&
        value.checkBoxComponent.id === emitted.checkboxId
    );

    if (foundCheckboxIndex < 0) {
      return;
    }

    this.horizontalForm.sections[foundSectionIndex].elements[
      foundCheckboxIndex
    ].checkBoxComponent = emitted.properties;
  }

  viewRadioButtonGroupPropertiesSidePanel(
    sectionId: string,
    radioButtonGroupId: string
  ): void {
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: INgImFormElementModel | undefined = properties.elements.find(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[5] &&
        value.radioButtonGroupComponent &&
        value.radioButtonGroupComponent.id === radioButtonGroupId
    );

    if (!element || !element.radioButtonGroupComponent) {
      return;
    }

    this.selectedForRadioButtonGroupPropertiesUpdate = {
      sectionId,
      radioButtonGroupId: radioButtonGroupId,
      properties: element.radioButtonGroupComponent,
    };

    this.isRadioButtonGroupPropertiesSidePanelOpen = true;
  }

  hideRadioButtonGroupPropertiesSidePanel(): void {
    this.isRadioButtonGroupPropertiesSidePanelOpen = false;
  }

  saveRadioButtonGroupProperties(
    emitted: IRadioButtonGroupPropertiesInputEmitModel
  ): void {
    let foundSectionIndex: number = this.horizontalForm.sections.findIndex(
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundRadioButtonGroupIndex: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[5] &&
        value.radioButtonGroupComponent &&
        value.radioButtonGroupComponent.id === emitted.radioButtonGroupId
    );

    if (foundRadioButtonGroupIndex < 0) {
      return;
    }

    this.horizontalForm.sections[foundSectionIndex].elements[
      foundRadioButtonGroupIndex
    ].radioButtonGroupComponent = emitted.properties;
  }

  viewImageboxPropertiesSidePanel(sectionId: string, imageBoxId: string): void {
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: INgImFormElementModel | undefined = properties.elements.find(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[6] &&
        value.imageBoxComponent &&
        value.imageBoxComponent.id === imageBoxId
    );

    if (!element || !element.imageBoxComponent) {
      return;
    }

    this.selectedForImageboxPropertiesUpdate = {
      sectionId,
      imageBoxId: imageBoxId,
      properties: element.imageBoxComponent,
    };

    this.isImageboxPropertiesSidePanelOpen = true;
  }

  hideImageboxPropertiesSidePanel(): void {
    this.isImageboxPropertiesSidePanelOpen = false;
  }

  saveImageboxProperties(emitted: IImageBoxPropertiesInputEmitModel): void {
    let foundSectionIndex: number = this.horizontalForm.sections.findIndex(
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundImageboxId: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[6] &&
        value.imageBoxComponent &&
        value.imageBoxComponent.id === emitted.imageBoxId
    );

    if (foundImageboxId < 0) {
      return;
    }

    this.horizontalForm.sections[foundSectionIndex].elements[
      foundImageboxId
    ].imageBoxComponent = emitted.properties;
  }

  viewTextPropertiesSidePanel(sectionId: string, textId: string): void {
    let properties: INgImHorizonatalFormSectionModel | undefined =
      this.horizontalForm.sections.find(
        (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
      );

    if (!properties) {
      return;
    }

    let element: INgImFormElementModel | undefined = properties.elements.find(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[7] &&
        value.textComponent &&
        value.textComponent.id === textId
    );

    if (!element || !element.textComponent) {
      return;
    }

    this.selectedForTextPropertiesUpdate = {
      sectionId,
      textId: textId,
      properties: element.textComponent,
    };

    this.isTextPropertiesSidePanelOpen = true;
  }

  hideTextPropertiesSidePanel(): void {
    this.isTextPropertiesSidePanelOpen = false;
  }

  saveTextProperties(emitted: ITextPropertiesInputEmitModel): void {
    let foundSectionIndex: number = this.horizontalForm.sections.findIndex(
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === emitted.sectionId
    );

    if (foundSectionIndex < 0) {
      return;
    }

    const foundTextId: number = this.horizontalForm.sections[
      foundSectionIndex
    ].elements.findIndex(
      (value: INgImFormElementModel) =>
        value.type === FIELDS[7] &&
        value.textComponent &&
        value.textComponent.id === emitted.textId
    );

    if (foundTextId < 0) {
      return;
    }

    this.horizontalForm.sections[foundSectionIndex].elements[
      foundTextId
    ].textComponent = emitted.properties;
  }

  viewFormPropertiesSidePanel(): void {
    this.isFormPropertiesSidePanelOpen = true;
  }

  hideFormPropertiesSidePanel(): void {
    this.isFormPropertiesSidePanelOpen = false;
  }

  saveFormProperties(emitted: INgImHorizontalFormModel): void {
    this.horizontalForm = emitted;
  }

  publishForm(): void {
    this.publishFormEvent.emit(this.horizontalForm);
  }

  onSectionDragStart(sectionIndex: number) {
    this.draggedSectionIndex = sectionIndex;
  }

  onSectionDragOver(sectionEvent: DragEvent, sectionIndex: number) {
    sectionEvent.preventDefault();

    if (sectionIndex === this.draggedSectionIndex) {
      return;
    }

    this.replaceSectionIndex = sectionIndex;
  }

  onSectionDrop(event: DragEvent, sectionIndex: number) {
    event.preventDefault();

    if (this.draggedSectionIndex === null) {
      return;
    }

    if (this.draggedSectionIndex === sectionIndex) {
      this.draggedSectionIndex = null;
      return;
    }

    const draggedSection: INgImHorizonatalFormSectionModel =
      this.horizontalForm.sections[this.draggedSectionIndex];

    this.horizontalForm.sections.splice(this.draggedSectionIndex, 1);
    this.horizontalForm.sections.splice(sectionIndex, 0, draggedSection);
    this.draggedSectionIndex = null;
    this.replaceSectionIndex = null;
  }

  onSectionDragEnd(): void {
    this.draggedSectionIndex = null;
    this.replaceSectionIndex = null;
  }

  onFieldDragStart(sectionIndex: number, fieldIndex: number) {
    this.draggedField = { sectionIndex, fieldIndex };
  }

  onFieldDragOver(event: DragEvent, sectionIndex: number, fieldIndex: number) {
    event.preventDefault();

    if (!this.draggedField) {
      return;
    }

    if (
      sectionIndex === this.draggedField.sectionIndex &&
      fieldIndex === this.draggedField.fieldIndex
    ) {
      return;
    }

    this.replaceField = {
      sectionIndex,
      fieldIndex,
    };
  }

  onFieldDrop(event: DragEvent, sectionIndex: number, fieldIndex: number) {
    event.preventDefault();
    if (!this.draggedField || this.draggedField.sectionIndex !== sectionIndex) {
      this.draggedField = null;
      return;
    }

    if (!this.draggedField && this.draggedField === fieldIndex) {
      this.draggedField = null;
      return;
    }

    const draggedField: INgImFormElementModel =
      this.horizontalForm.sections[sectionIndex].elements[
        this.draggedField.fieldIndex
      ];

    this.horizontalForm.sections[sectionIndex].elements.splice(
      this.draggedField.fieldIndex,
      1
    );

    this.horizontalForm.sections[sectionIndex].elements.splice(
      fieldIndex,
      0,
      draggedField
    );

    this.draggedField = null;
    this.replaceField = null;
  }

  onFieldDragEnd(): void {
    this.draggedField = null;
    this.replaceField = null;
  }
}
