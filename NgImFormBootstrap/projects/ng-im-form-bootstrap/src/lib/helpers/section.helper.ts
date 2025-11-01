import {
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
} from '../models/horizontal-form.model';

function addSection(
  horizontalForm: IHorizontalFormModel
): IHorizontalFormModel {
  const generatedId: string = String(Date.now());

  horizontalForm.sections.push({
    id: generatedId,
    title: 'Section Title',
    subTitle: 'Section Subtitle',
    class: 'section-class',
    headerClass: 'section-header-class',
    bodyClass: 'section-body-class',
    elements: [],
  });

  return horizontalForm;
}

function removeSection(
  id: string,
  horizontalForm: IHorizontalFormModel
): IHorizontalFormModel | null {
  if (horizontalForm.sections.length <= 0) {
    return null;
  }

  const indexOf: number = horizontalForm.sections.findIndex(
    (value: IHorizonatalFormSectionModel) => value.id === id
  );

  if (indexOf < 0) {
    return null;
  }

  horizontalForm.sections.splice(indexOf, 1);

  return horizontalForm;
}

export const sectionHelpers = {
  addSection,
  removeSection,
};
