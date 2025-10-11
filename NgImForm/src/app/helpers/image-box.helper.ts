import { FIELDS } from '../constants/field-types.constant';
import {
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
  IImageBoxModel,
} from '../models/horizontal-form.model';

function addImageBoxGroup(
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

  const toImageBox: IImageBoxModel = {
    id: generatedId,
    order: order + 1,
    name: generatedId,
    class: 'form-control',
    userDefinedId: generatedId,
    url: '',
    alt: '',
    height: 200,
    width: 200,
    alignment: 'left',
  };

  toModifySection.elements.push({
    type: FIELDS[6],
    imageBoxComponent: toImageBox,
  });

  return horizontalForm;
}

function removeImageBox(
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
