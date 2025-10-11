import { FIELDS } from '../constants/field-types.constant';
import {
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
  IRadioButtonGroupModel,
} from '../models/horizontal-form.model';

function addRadioButtonGroup(
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

  const toAddRadioButtonGroup: IRadioButtonGroupModel = {
    id: generatedId,
    order: order + 1,
    name: generatedId,
    label: `Input Field ${order + 1}`,
    class: 'form-control',
    userDefinedId: generatedId,
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
    radioButtonGroup: toAddRadioButtonGroup,
  });

  return horizontalForm;
}

function removeRadioButtonGroup(
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
      value.type === FIELDS[5] && value.radioButtonGroup?.id === id
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
