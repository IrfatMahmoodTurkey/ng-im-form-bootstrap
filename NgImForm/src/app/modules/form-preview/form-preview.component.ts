import { Component, Input, OnInit } from '@angular/core';
import {
  IElementModel,
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
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
  constructor() {}

  ngOnInit() {
    if (!this.preset) {
      console.error('Must need a form object to initialze the form!');
      return;
    }

    this.sections = this.preset.sections;
    this.buildForm();
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
}
