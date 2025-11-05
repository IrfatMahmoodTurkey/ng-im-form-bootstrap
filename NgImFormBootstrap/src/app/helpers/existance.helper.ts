import {
  INgImFormElementModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
} from '../models/horizontal-form.model';

export function checkNameExistance(
  horizontalForm: INgImHorizontalFormModel,
  currentName: string,
  newName: string
): boolean {
  if (newName === currentName) {
    return false;
  }

  const sections: INgImHorizonatalFormSectionModel[] = horizontalForm.sections;

  let names: (string | undefined)[] = [];

  for (const section of sections) {
    const elements: INgImFormElementModel[] = section.elements.map(
      (value) => value
    );

    names = elements.map(
      (value) =>
        value.checkBoxComponent?.name ||
        value.fileFieldComponent?.name ||
        value.imageBoxComponent?.name ||
        value.radioButtonGroupComponent?.name ||
        value.selectBoxComponent?.name ||
        value.textAreaComponent?.name ||
        value.textBoxComponent?.name ||
        value.textComponent?.name
    );
  }

  const indexOf: number = names.findIndex((value) => value === newName);

  if (indexOf >= 0) {
    return true;
  }

  return false;
}
