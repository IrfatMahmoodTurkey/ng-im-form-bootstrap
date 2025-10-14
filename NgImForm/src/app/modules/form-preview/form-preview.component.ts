import { Component, Input, OnInit } from '@angular/core';
import {
  ICheckBoxModel,
  IElementModel,
  IFileFieldModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
  ISelectBoxModel,
  ITextAreaModel,
  ITextBoxModel,
} from '../../models/horizontal-form.model';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TEXTBOX_UTILITIES } from '../../constants/textbox-utilities.constant';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css'],
})
export class FormPreviewComponent implements OnInit {
  @Input() preset: IHorizontalFormModel | null | undefined;

  sections: IHorizonatalFormSectionModel[] = [];

  form: FormGroup = new FormGroup({});
  isSubmitClicked: boolean = false;

  textboxValidationEnum = TEXTBOX_UTILITIES.TextboxValidationsEnum;

  browsedFiles: Map<
    string,
    {
      required: boolean;
      requiredMessage: string | null;
      files: any[];
      hasFiles: boolean;
      sizeValid: boolean;
      sizeValidationMessage: string | null;
      extensionsValid: boolean;
      extendsionValidationMessages: string[];
      everythingIsValid: boolean;
    }
  > = new Map();

  constructor() {}

  ngOnInit() {
    if (!this.preset) {
      console.error('Must need a form object to initialze the form!');
      return;
    }

    this.sections = this.preset.sections;
    this.buildForm();
    this.initializeFileFieldUtilities();
  }

  submit(): void {
    if (!this.preset) {
      console.error('Must need a form object to initialze the form!');
      return;
    }

    if (!this.preset.checkValidations) {
      // action when validation not needed
      return;
    }

    this.isSubmitClicked = true;
  }

  private buildForm(): void {
    for (const section of this.sections) {
      for (const element of section.elements) {
        this.appendControl(element);
      }
    }
  }

  private appendControl(element: IElementModel): void {
    if (element.textBoxComponent) {
      this.appendTextBox(element.textBoxComponent);
    } else if (element.textAreaComponent) {
      this.appendTextArea(element.textAreaComponent);
    } else if (element.selectBoxComponent) {
      this.appendSelectBox(element.selectBoxComponent);
    } else if (element.checkBoxComponent) {
      this.appendCheckbox(element.checkBoxComponent);
    }
  }

  private appendTextBox(textbox: ITextBoxModel): void {
    let validators: ValidatorFn[] = [];

    if (!textbox.isReadOnly && !textbox.isHidden) {
      if (textbox.isRequired) {
        validators.push(Validators.required);
      }

      if (textbox.validations) {
        for (const validation of textbox.validations) {
          const { type, min, max, minChar, maxChar } = validation;

          if (type === this.textboxValidationEnum.EMAIL) {
            validators.push(Validators.email);
          } else if (type === this.textboxValidationEnum.MIN) {
            validators.push(Validators.min(min ?? 0));
          } else if (type === this.textboxValidationEnum.MAX) {
            validators.push(Validators.max(max ?? 0));
          } else if (type === this.textboxValidationEnum.MIN_LEN) {
            validators.push(Validators.minLength(minChar ?? 0));
          } else if (type === this.textboxValidationEnum.MAX_LEN) {
            validators.push(Validators.maxLength(maxChar ?? 0));
          }
        }
      }

      if (textbox.regexValidation) {
        const { expression } = textbox.regexValidation;

        validators.push(Validators.pattern(expression));
      }
    }

    this.form.addControl(
      textbox.name,
      new FormControl(textbox.value, validators)
    );
  }

  private appendTextArea(textarea: ITextAreaModel): void {
    let validators: ValidatorFn[] = [];

    if (!textarea.isReadOnly && !textarea.isHidden) {
      if (textarea.isRequired) {
        validators.push(Validators.required);
      }

      if (textarea.validations) {
        for (const validation of textarea.validations) {
          const { type, minChar, maxChar } = validation;

          if (type === this.textboxValidationEnum.MIN_LEN) {
            validators.push(Validators.minLength(minChar ?? 0));
          } else if (type === this.textboxValidationEnum.MAX_LEN) {
            validators.push(Validators.maxLength(maxChar ?? 0));
          }
        }
      }

      if (textarea.regexValidation) {
        const { expression } = textarea.regexValidation;

        validators.push(Validators.pattern(expression));
      }
    }

    this.form.addControl(
      textarea.name,
      new FormControl(textarea.value, validators)
    );
  }

  private initializeFileFieldUtilities(): void {
    if (!this.preset) return;

    for (const section of this.preset.sections) {
      for (const element of section.elements) {
        if (element.fileFieldComponent) {
          this.browsedFiles.set(element.fileFieldComponent.id, {
            files: [],
            hasFiles: false,
            required:
              !element.fileFieldComponent.isHidden &&
              !element.fileFieldComponent.isReadOnly
                ? element.fileFieldComponent.isRequired
                : false,
            requiredMessage: element.fileFieldComponent.requiredMessage,
            sizeValid: true,
            sizeValidationMessage: element.fileFieldComponent.sizeValidation
              ? element.fileFieldComponent.sizeValidation.message
              : null,
            extensionsValid: true,
            extendsionValidationMessages: [],
            everythingIsValid:
              !element.fileFieldComponent.isHidden &&
              !element.fileFieldComponent.isReadOnly
                ? element.fileFieldComponent.isRequired
                : false,
          });
        }
      }
    }
  }

  fileChangeEvent(event: any, props: IFileFieldModel): void {
    if (event.target.files.length <= 0) {
      this.browsedFiles.set(props.id, {
        files: [],
        hasFiles: false,
        required:
          !props.isHidden && !props.isReadOnly ? props.isRequired : false,
        requiredMessage: props.requiredMessage,
        sizeValid: true,
        sizeValidationMessage: props.sizeValidation
          ? props.sizeValidation.message
          : null,
        extensionsValid: true,
        extendsionValidationMessages: [],
        everythingIsValid:
          !props.isHidden && !props.isReadOnly ? props.isRequired : false,
      });

      return;
    }

    let current:
      | {
          required: boolean;
          requiredMessage: string | null;
          files: any[];
          hasFiles: boolean;
          sizeValid: boolean;
          sizeValidationMessage: string | null;
          extensionsValid: boolean;
          extendsionValidationMessages: string[];
          everythingIsValid: boolean;
        }
      | undefined = this.browsedFiles.get(props.id);

    let toUpdate:
      | {
          required: boolean;
          requiredMessage: string | null;
          files: any[];
          hasFiles: boolean;
          sizeValid: boolean;
          sizeValidationMessage: string | null;
          extensionsValid: boolean;
          extendsionValidationMessages: string[];
          everythingIsValid: boolean;
        }
      | undefined = undefined;

    if (!current) {
      toUpdate = this.browsedFiles.get(props.id);
    } else {
      toUpdate = current;
    }

    if (!toUpdate) return;

    if (props.isMultiple) {
      const files = event.target.files;

      toUpdate.files = files.length > 0 ? [...files] : [];
      toUpdate.hasFiles = toUpdate.files.length > 0;
    } else {
      const file = event.target.files.length > 0 ? event.target.files[0] : null;

      if (file) {
        toUpdate.files = [];
        toUpdate.files.push(file);
      }

      toUpdate.hasFiles = toUpdate.files.length > 0;
    }

    if (props.isHidden || props.isReadOnly) {
      toUpdate.required = false;
    } else {
      toUpdate.required = props.isRequired;
    }

    if (props.sizeValidation) {
      if (props.isMultiple) {
        const files = event.target.files;

        for (const file of files) {
          const isValid: boolean = this.checkFileSize(
            file,
            props.sizeValidation.size
          );

          if (!isValid) {
            toUpdate.sizeValid = false;
            break;
          }

          toUpdate.sizeValid = true;
        }
      } else {
        const file = event.target.files[0];

        if (file) {
          const isValid: boolean = this.checkFileSize(
            file,
            props.sizeValidation.size
          );

          toUpdate.sizeValid = isValid;
        }
      }
    }

    if (props.extensionValidations && props.extensionValidations.length > 0) {
      if (props.isMultiple) {
        const files = event.target.files;

        for (const file of files) {
          for (const exntensionValidation of props.extensionValidations) {
            const isValid: boolean = this.checkFileExtension(
              file,
              exntensionValidation.extension
            );

            if (!isValid) {
              toUpdate.extensionsValid = false;
              toUpdate.extendsionValidationMessages.push(
                exntensionValidation.message
              );
              break;
            }

            toUpdate.extensionsValid = true;
          }
        }
      } else {
        const file = event.target.files[0];

        if (file) {
          for (const exntensionValidation of props.extensionValidations) {
            const isValid: boolean = this.checkFileExtension(
              file,
              exntensionValidation.extension
            );

            if (!isValid) {
              toUpdate.extensionsValid = false;
              toUpdate.extendsionValidationMessages.push(
                exntensionValidation.message
              );
              break;
            }

            toUpdate.extensionsValid = true;
          }
        }
      }
    }

    let everythingIsFine: boolean = false;

    if (props.isHidden || props.isReadOnly) {
      everythingIsFine = true;
    } else {
      everythingIsFine =
        (props.isRequired ? toUpdate.hasFiles : true) &&
        toUpdate.sizeValid &&
        toUpdate.extensionsValid;
    }

    toUpdate.everythingIsValid = everythingIsFine;

    this.browsedFiles.set(props.id, toUpdate);
  }

  private checkFileSize(file: any, sizeToCompare: number): boolean {
    const sizeInMB: number = file.size / (1024 * 1024);
    return sizeInMB <= sizeToCompare;
  }

  private checkFileExtension(file: any, extensionToCompare: string): boolean {
    const extension: string = file.name.split('.').pop()?.toLowerCase();

    return extension === extensionToCompare;
  }

  private appendSelectBox(selectBox: ISelectBoxModel): void {
    let validators: ValidatorFn[] = [];

    if (!selectBox.isReadOnly && !selectBox.isHidden) {
      if (selectBox.isRequired) {
        validators.push(Validators.required);
      }
    }

    let selected: string[] = [];

    if (selectBox.options) {
      if (selectBox.isMultiple) {
        selected = selectBox.options
          .filter((value) => value.selected)
          .map((value) => value.value);

        this.form.addControl(
          selectBox.name,
          new FormControl(selected, validators)
        );
      } else {
        selected = selected = selectBox.options
          .filter((value) => value.selected)
          .map((value) => value.value);

        if (selected.length > 0) {
          this.form.addControl(
            selectBox.name,
            new FormControl(selected[0], validators)
          );
        }
      }
    }

    this.form.addControl(selectBox.name, new FormControl('', validators));
  }

  private appendCheckbox(checkbox: ICheckBoxModel): void {
    let validators: ValidatorFn[] = [];

    if (!checkbox.isReadOnly && !checkbox.isHidden) {
      if (checkbox.isRequired) {
        validators.push(Validators.requiredTrue);
      }
    }

    if (checkbox.checked) {
      this.form.addControl(checkbox.name, new FormControl(true, validators));
    } else {
      this.form.addControl(checkbox.name, new FormControl(false, validators));
    }
  }
}
