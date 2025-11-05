import { FIELDS } from '../constants/field-types.constant';
import {
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
  INgImFormSelectBoxModel,
} from '../models/horizontal-form.model';

function addSelectbox(
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

  const toAddSelectBox: INgImFormSelectBoxModel = {
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
