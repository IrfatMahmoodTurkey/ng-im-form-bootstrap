import { APIMethodsEnum } from '../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../enums/send-body-types.enum';

export interface INgImHorizontalFormModel {
  checkValidations: boolean;
  isResetButtonAvailable: boolean;
  submitAPIUrl: string;
  method: APIMethodsEnum;
  sendBodyAs: SendBodyTypesEnum;
  responseMessages: {
    onSuccess: {
      title: string;
      subTitle: string;
    };
    onFailed: {
      title: string;
      subTitle: string;
    };
  };
  sections: INgImHorizonatalFormSectionModel[];
}

export interface INgImHorizonatalFormSectionModel {
  id: string;
  title: string;
  subTitle: string;
  class: string;
  headerClass: string;
  bodyClass: string;
  elements: INgImFormElementModel[];
}

export interface INgImFormElementModel {
  id: string;
  type: string;
  textBoxComponent?: INgImFormTextBoxModel | null;
  textAreaComponent?: INgImFormTextAreaModel | null;
  selectBoxComponent?: INgImFormSelectBoxModel | null;
  fileFieldComponent?: INgImFormFileFieldModel | null;
  checkBoxComponent?: INgImFormCheckBoxModel | null;
  radioButtonGroupComponent?: INgImFormRadioButtonGroupModel | null;
  imageBoxComponent?: INgImFormImageBoxModel | null;
  textComponent?: INgImFormTextModel | null;
}

export interface INgImFormTextBoxModel {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  class: string;
  validationErrorClass: string;
  value: string;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  validations:
    | {
        type: string;
        min?: number | null;
        max?: number | null;
        minChar?: number | null;
        maxChar?: number | null;
        message: string;
      }[]
    | null;
  regexValidation: {
    expression: string;
    message: string;
  } | null;
}

export interface INgImFormTextAreaModel {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  class: string;
  validationErrorClass: string;
  rows: number;
  columns: number | null;
  value: string;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  validations:
    | {
        type: string;
        minChar?: number | null;
        maxChar?: number | null;
        message: string;
      }[]
    | null;
  regexValidation: {
    expression: string;
    message: string;
  } | null;
}

export interface INgImFormFileFieldModel {
  id: string;
  name: string;
  label: string;
  class: string;
  validationErrorClass: string;
  accept: string;
  isMultiple: boolean;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  sizeValidation: {
    size: number;
    message: string;
  } | null;
  extensionValidations:
    | {
        extension: string;
        message: string;
      }[]
    | null;
}

export interface INgImFormSelectBoxModel {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  class: string;
  validationErrorClass: string;
  isMultiple: boolean;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  options:
    | {
        selected: boolean;
        value: string;
        text: string;
      }[]
    | null;
}

export interface INgImFormCheckBoxModel {
  id: string;
  name: string;
  label: string;
  class: string;
  validationErrorClass: string;
  checked: boolean;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
}

export interface INgImFormRadioButtonGroupModel {
  id: string;
  name: string;
  label: string;
  class: string;
  validationErrorClass: string;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  radioButtons:
    | {
        checked: boolean;
        value: string;
        text: string;
      }[]
    | null;
}

export interface INgImFormImageBoxModel {
  id: string;
  name: string;
  class: string;
  url: string;
  alt: string;
  height: number;
  width: number;
  alignment: string;
}

export interface INgImFormTextModel {
  id: string;
  name: string;
  class: string;
  text: string;
  alignment: string;
}
