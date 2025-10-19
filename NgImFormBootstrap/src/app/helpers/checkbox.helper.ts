import { FIELDS } from '../constants/field-types.constant';
import {
  ICheckBoxModel,
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
} from '../models/horizontal-form.model';

function addCheckbox(
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

  const toAddCheckBox: ICheckBoxModel = {
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
