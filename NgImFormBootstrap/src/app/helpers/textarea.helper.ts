import {
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
  INgImFormTextAreaModel,
} from '../models/horizontal-form.model';
import { FIELDS } from '../constants/field-types.constant';

function addTextArea(
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

  const toAddTextArea: INgImFormTextAreaModel = {
    id: generatedId,
    name: generatedId,
    rows: 10,
    columns: null,
    label: `Input Area ${order + 1}`,
    class: 'form-control',
    placeholder: `Input Area ${order + 1}`,
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
    id: generatedId,
    type: FIELDS[1],
    textAreaComponent: toAddTextArea,
  });

  return horizontalForm;
}

function removeTextArea(
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
      value.type === FIELDS[1] && value.textAreaComponent?.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  elements.splice(indexOf, 1);

  return horizontalForm;
}

export const textareaHelpers = {
  addTextArea,
  removeTextArea,
};
