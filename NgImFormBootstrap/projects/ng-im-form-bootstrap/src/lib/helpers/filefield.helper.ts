import { FIELDS } from '../constants/field-types.constant';
import {
  IElementModel,
  IFileFieldModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
} from '../models/horizontal-form.model';

function addFilefield(
  selectedSectionId: string | undefined,
  horizontalForm: IHorizontalFormModel
): IHorizontalFormModel | null {
  if (!selectedSectionId) {
    return null;
  }

  let toModifySection: IHorizonatalFormSectionModel | undefined =
    horizontalForm.sections.find(
      (value: IHorizonatalFormSectionModel) => value.id === selectedSectionId
    );

  if (!toModifySection) {
    return null;
  }

  const generatedId: string = String(Date.now());

  const order: number = toModifySection.elements.length;

  const toAddFileField: IFileFieldModel = {
    id: generatedId,
    name: generatedId,
    label: `Input Field ${order + 1}`,
    accept: '',
    class: 'form-control',
    validationErrorClass: '',
    isMultiple: false,
    isReadOnly: false,
    isHidden: false,
    isRequired: false,
    requiredMessage: null,
    sizeValidation: null,
    extensionValidations: null,
  };

  toModifySection.elements.push({
    type: FIELDS[2],
    fileFieldComponent: toAddFileField,
  });

  return horizontalForm;
}

function removeFilefield(
  sectionId: string,
  id: string,
  horizontalForm: IHorizontalFormModel
): IHorizontalFormModel | null {
  let toModifySection: IHorizonatalFormSectionModel | undefined =
    horizontalForm.sections.find(
      (value: IHorizonatalFormSectionModel) => value.id === sectionId
    );

  if (!toModifySection) {
    return null;
  }

  let elements: IElementModel[] = toModifySection.elements;

  const indexOf: number = elements.findIndex(
    (value: IElementModel) =>
      value.type === FIELDS[2] && value.fileFieldComponent?.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  elements.splice(indexOf, 1);

  return horizontalForm;
}

export const filefieldHelpers = {
  addFilefield,
  removeFilefield,
};
