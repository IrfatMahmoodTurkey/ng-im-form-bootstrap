import { FIELDS } from '../constants/field-types.constant';
import {
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
  INgImFormImageBoxModel,
} from '../models/horizontal-form.model';
import { ALIGNMENTS } from '../constants/alignments.constant';

function addImageBoxGroup(
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

  const toImageBox: INgImFormImageBoxModel = {
    id: generatedId,
    order: order + 1,
    name: generatedId,
    class: '',
    userDefinedId: generatedId,
    url: '',
    alt: '',
    height: 200,
    width: 200,
    alignment: ALIGNMENTS[0],
  };

  toModifySection.elements.push({
    id: generatedId,
    type: FIELDS[6],
    imageBoxComponent: toImageBox,
  });

  return horizontalForm;
}

function removeImageBox(
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
      value.type === FIELDS[6] && value.imageBoxComponent?.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  elements.splice(indexOf, 1);

  return horizontalForm;
}

export const imageBoxHelpers = {
  addImageBoxGroup,
  removeImageBox,
};
