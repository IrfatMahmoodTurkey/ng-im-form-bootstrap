import {
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
} from '../models/horizontal-form.model';

function addSection(
  horizontalForm: INgImHorizontalFormModel
): INgImHorizontalFormModel {
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
  horizontalForm: INgImHorizontalFormModel
): INgImHorizontalFormModel | null {
  if (horizontalForm.sections.length <= 0) {
    return null;
  }

  const indexOf: number = horizontalForm.sections.findIndex(
    (value: INgImHorizonatalFormSectionModel) => value.id === id
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
