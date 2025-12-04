import { ALIGNMENTS } from '../constants/alignments.constant';
import { FIELDS } from '../constants/field-types.constant';
import {
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
  INgImFormTextModel,
} from '../models/horizontal-form.model';

function addText(
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

  const toText: INgImFormTextModel = {
    id: generatedId,
    order: order + 1,
    name: generatedId,
    class: '',
    userDefinedId: generatedId,
    text: 'Text',
    alignment: ALIGNMENTS[0],
  };

  toModifySection.elements.push({
    id: generatedId,
    type: FIELDS[7],
    textComponent: toText,
  });

  return horizontalForm;
}

function removeText(
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
