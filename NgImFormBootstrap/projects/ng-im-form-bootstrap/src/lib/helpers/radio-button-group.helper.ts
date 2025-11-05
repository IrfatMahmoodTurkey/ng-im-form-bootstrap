import { FIELDS } from '../constants/field-types.constant';
import {
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
  INgImFormRadioButtonGroupModel,
} from '../models/horizontal-form.model';

function addRadioButtonGroup(
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

  const toAddRadioButtonGroup: INgImFormRadioButtonGroupModel = {
    id: generatedId,
    name: generatedId,
    label: `Radio Button Group ${order + 1}`,
    class: 'form-check-input',
    validationErrorClass: '',
    isReadOnly: false,
    isHidden: false,
    isRequired: false,
    requiredMessage: null,
    radioButtons: [
      {
        checked: false,
        value: 'Radio Button',
        text: 'Radio Button',
      },
    ],
  };

  toModifySection.elements.push({
    type: FIELDS[5],
    radioButtonGroupComponent: toAddRadioButtonGroup,
  });

  return horizontalForm;
}

function removeRadioButtonGroup(
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
      value.type === FIELDS[5] && value.radioButtonGroupComponent?.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  elements.splice(indexOf, 1);

  return horizontalForm;
}

export const radioButtonGroupHelpers = {
  addRadioButtonGroup,
  removeRadioButtonGroup,
};
