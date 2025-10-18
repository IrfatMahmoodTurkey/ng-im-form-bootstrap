import {
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
} from '../models/horizontal-form.model';

export function checkNameExistance(
  horizontalForm: IHorizontalFormModel,
  currentName: string,
  newName: string
): boolean {
  if (newName === currentName) {
    return false;
  }

  const sections: IHorizonatalFormSectionModel[] = horizontalForm.sections;

  let names: (string | undefined)[] = [];

  for (const section of sections) {
    const elements: IElementModel[] = section.elements.map((value) => value);

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
