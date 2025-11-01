import { FIELDS } from '../constants/field-types.constant';
import {
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
  ISelectBoxModel,
} from '../models/horizontal-form.model';

function addSelectbox(
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

  const toAddSelectBox: ISelectBoxModel = {
    id: generatedId,
    name: generatedId,
    label: `Input Field ${order + 1}`,
    class: 'form-check-input',
    placeholder: `Select`,
    validationErrorClass: '',
    isMultiple: false,
    isReadOnly: false,
    isHidden: false,
    isRequired: false,
    requiredMessage: null,
    options: [],
  };

  toModifySection.elements.push({
    type: FIELDS[3],
    selectBoxComponent: toAddSelectBox,
  });

  return horizontalForm;
}

function removeSelectBox(
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
      value.type === FIELDS[3] && value.selectBoxComponent?.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  elements.splice(indexOf, 1);

  return horizontalForm;
}

export const selectboxHelpers = {
  addSelectbox,
  removeSelectBox,
};
