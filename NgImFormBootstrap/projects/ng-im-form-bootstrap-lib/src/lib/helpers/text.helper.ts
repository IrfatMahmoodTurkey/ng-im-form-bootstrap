import { ALIGNMENTS } from '../constants/alignments.constant';
import { FIELDS } from '../constants/field-types.constant';
import {
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
  ITextModel,
} from '../models/horizontal-form.model';

function addText(
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

  const toText: ITextModel = {
    id: generatedId,
    order: order + 1,
    name: generatedId,
    class: '',
    userDefinedId: generatedId,
    text: 'Text',
    alignment: ALIGNMENTS[0],
  };

  toModifySection.elements.push({
    type: FIELDS[7],
    textComponent: toText,
  });

  return horizontalForm;
}

function removeText(
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
      value.type === FIELDS[7] && value.textComponent?.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  elements.splice(indexOf, 1);

  return horizontalForm;
}

export const textHelpers = {
  addText,
  removeText,
};
