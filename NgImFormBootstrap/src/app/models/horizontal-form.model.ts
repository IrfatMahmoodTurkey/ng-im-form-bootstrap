import { APIMethodsEnum } from '../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../enums/send-body-types.enum';

export interface IHorizontalFormModel {
  checkValidations: boolean;
  isResetButtonAvailable: boolean;
  submitAPIUrl: string;
  method: APIMethodsEnum;
  sendBodyAs: SendBodyTypesEnum;
  authorization: {
    willAuthorize: boolean;
    bearerTokenStorageKey: string;
  };
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
  sections: IHorizonatalFormSectionModel[];
}

export interface IHorizonatalFormSectionModel {
  id: string;
  title: string;
  subTitle: string;
  class: string;
  headerClass: string;
  bodyClass: string;
  elements: IElementModel[];
}

export interface IElementModel {
  type: string;
  textBoxComponent?: ITextBoxModel | null;
  textAreaComponent?: ITextAreaModel | null;
  selectBoxComponent?: ISelectBoxModel | null;
  fileFieldComponent?: IFileFieldModel | null;
  checkBoxComponent?: ICheckBoxModel | null;
  radioButtonGroupComponent?: IRadioButtonGroupModel | null;
  imageBoxComponent?: IImageBoxModel | null;
  textComponent?: ITextModel | null;
}

export interface ITextBoxModel {
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

export interface ITextAreaModel {
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

export interface IFileFieldModel {
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

export interface ISelectBoxModel {
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

export interface ICheckBoxModel {
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

export interface IRadioButtonGroupModel {
  id: string;
  order: number;
  name: string;
  label: string;
  class: string;
  userDefinedId: string;
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

export interface IImageBoxModel {
  id: string;
  order: number;
  name: string;
  class: string;
  userDefinedId: string;
  url: string;
  alt: string;
  height: number;
  width: number;
  alignment: string;
}

export interface ITextModel {
  id: string;
  order: number;
  name: string;
  class: string;
  userDefinedId: string;
  text: string;
  alignment: string;
}
