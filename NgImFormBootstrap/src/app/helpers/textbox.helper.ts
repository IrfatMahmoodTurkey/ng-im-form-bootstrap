import {
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
  INgImFormTextBoxModel,
} from '../models/horizontal-form.model';
import { FIELDS } from '../constants/field-types.constant';

function addTextbox(
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

  const toAddTextBox: INgImFormTextBoxModel = {
    id: generatedId,
    name: generatedId,
    label: `Input Field ${order + 1}`,
    type: 'text',
    class: 'form-control',
    placeholder: `Input Field ${order + 1}`,
    validationErrorClass: '',
    value: '',
    isReadOnly: false,
    isHidden: false,
    isRequired: false,
    requiredMessage: null,
    validations: null,
    regexValidation: null,
  };

  toModifySection.elements.push({
    type: FIELDS[0],
    textBoxComponent: toAddTextBox,
  });

  return horizontalForm;
}

function removeTextbox(
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
      value.type === FIELDS[0] && value.textBoxComponent?.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  elements.splice(indexOf, 1);

  return horizontalForm;
}

export const textboxHelpers = {
  addTextbox,
  removeTextbox,
};
