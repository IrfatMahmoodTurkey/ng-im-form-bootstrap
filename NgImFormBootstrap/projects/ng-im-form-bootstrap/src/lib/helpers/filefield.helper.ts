import { FIELDS } from '../constants/field-types.constant';
import {
  INgImFormElementModel,
  INgImFormFileFieldModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
} from '../models/horizontal-form.model';

function addFilefield(
  selectedSectionId: string | undefined,
  horizontalForm: INgImHorizontalFormModel
): INgImHorizontalFormModel | null {
  if (!selectedSectionId) {
    return null;
  }

  let toModifySection: INgImHorizonatalFormSectionModel | undefined =
    horizontalForm.sections.find(
      (value: INgImHorizonatalFormSectionModel) =>
        value.id === selectedSectionId
    );

  if (!toModifySection) {
    return null;
  }

  const generatedId: string = String(Date.now());

  const order: number = toModifySection.elements.length;

  const toAddFileField: INgImFormFileFieldModel = {
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
    id: generatedId,
    type: FIELDS[2],
    fileFieldComponent: toAddFileField,
  });

  return horizontalForm;
}

function removeFilefield(
  sectionId: string,
  id: string,
  horizontalForm: INgImHorizontalFormModel
): INgImHorizontalFormModel | null {
  let toModifySection: INgImHorizonatalFormSectionModel | undefined =
    horizontalForm.sections.find(
      (value: INgImHorizonatalFormSectionModel) => value.id === sectionId
    );

  if (!toModifySection) {
    return null;
  }

  let elements: INgImFormElementModel[] = toModifySection.elements;

  const indexOf: number = elements.findIndex(
    (value: INgImFormElementModel) =>
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
