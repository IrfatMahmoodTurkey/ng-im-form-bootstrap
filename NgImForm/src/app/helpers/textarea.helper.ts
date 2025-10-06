import {
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
  ITextAreaModel,
} from '../models/horizontal-form.model';
import { FIELDS } from '../constants/field-types.constant';

function addTextArea(
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

  const toAddTextArea: ITextAreaModel = {
    id: generatedId,
    order: order + 1,
    name: generatedId,
    rows: 10,
    columns: null,
    label: `Input Area ${order + 1}`,
    class: 'form-control',
    placeholder: `Input Area ${order + 1}`,
    userDefinedId: generatedId,
    value: '',
    isReadOnly: false,
    isHidden: false,
    isRequired: false,
    requiredMessage: null,
    validations: null,
    regexValidation: null,
  };

  toModifySection.elements.push({
    type: FIELDS[1],
    textAreaComponent: toAddTextArea,
  });

  return horizontalForm;
}

function removeTextArea(
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
