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
    onSuccess: string;
    onFailed: string;
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
}

export interface ITextBoxModel {
  id: string;
  order: number;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  class: string;
  userDefinedId: string;
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
  order: number;
  name: string;
  label: string;
  placeholder: string;
  class: string;
  userDefinedId: string;
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
  order: number;
  name: string;
  label: string;
  class: string;
  userDefinedId: string;
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
  order: number;
  name: string;
  label: string;
  placeholder: string;
  class: string;
  userDefinedId: string;
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
