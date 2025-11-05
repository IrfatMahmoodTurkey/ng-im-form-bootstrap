import { FIELDS } from '../constants/field-types.constant';
import {
  INgImFormCheckBoxModel,
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
} from '../models/horizontal-form.model';

function addCheckbox(
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

  const toAddCheckBox: INgImFormCheckBoxModel = {
    id: generatedId,
    name: generatedId,
    label: `Checkbox ${order + 1}`,
    class: 'form-check-input',
    validationErrorClass: '',
    checked: false,
    isReadOnly: false,
    isHidden: false,
    isRequired: false,
    requiredMessage: null,
  };

  toModifySection.elements.push({
    type: FIELDS[4],
    checkBoxComponent: toAddCheckBox,
  });

  return horizontalForm;
}

function removeCheckBox(
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
      value.type === FIELDS[4] && value.checkBoxComponent?.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  elements.splice(indexOf, 1);

  return horizontalForm;
}

export const checkboxHelpers = {
  addCheckbox,
  removeCheckBox,
};
