import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITextboxPropertiesInputEmitModel } from '../../../models/textbox-properties-input-emit.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TEXTBOX_VALIDATIONS } from '../../../constants/build-in-validations.constant';
import { ITextBoxModel } from '../../../models/horizontal-form.model';
import { TEXTBOX_UTILITIES } from '../../../constants/textbox-utilities.constant';

@Component({
  selector: 'app-textbox-properties-sidepanel',
  templateUrl: './textbox-properties-sidepanel.component.html',
})
export class TextboxPropertiesSidepanelComponent implements OnInit {
  textboxTypes: { type: string; validations: string[] }[] =
    TEXTBOX_UTILITIES.TEXTBOX_TYPES;

  textBoxValidations: { title: string; value: string }[] = TEXTBOX_VALIDATIONS;

  @Input() textboxProperties: ITextboxPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();

  form: FormGroup = new FormGroup({});

  availableValidations: string[] = [
    TEXTBOX_UTILITIES.TextboxValidationsEnum.EMAIL,
    TEXTBOX_UTILITIES.TextboxValidationsEnum.MIN,
    TEXTBOX_UTILITIES.TextboxValidationsEnum.MAX,
    TEXTBOX_UTILITIES.TextboxValidationsEnum.MIN_LEN,
    TEXTBOX_UTILITIES.TextboxValidationsEnum.MAX_LEN,
  ];

  toUseValidations: string[] = [];

  canUseEmailValidation: boolean = false;
  canUseMinValidation: boolean = false;
  canUseMaxValidation: boolean = false;
  canUseMinLenValidation: boolean = false;
  canUseMaxLenValidation: boolean = false;

  isSubmitClicked: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }

  private initializeForm(): void {
    this.form.addControl(
      'order',
      new FormControl(1, [Validators.required, Validators.min(1)])
    );
    this.form.addControl('name', new FormControl('', [Validators.required]));
    this.form.addControl('label', new FormControl('', [Validators.required]));
    this.form.addControl('type', new FormControl('', [Validators.required]));
    this.form.addControl('placeholder', new FormControl(''));
    this.form.addControl('class', new FormControl(''));
    this.form.addControl(
      'userDefinedId',
      new FormControl('', [Validators.required])
    );
    this.form.addControl('value', new FormControl(''));
    this.form.addControl('isReadOnly', new FormControl(false));
    this.form.addControl('isHidden', new FormControl(false));
    this.form.addControl('isRequired', new FormControl(false));
    this.form.addControl('requiredMessage', new FormControl(''));
    this.form.addControl('regex', new FormControl(''));
    this.form.addControl('regexMessage', new FormControl(''));

    this.form.addControl('isEmailValidate', new FormControl(false));
    this.form.addControl('emailValidationMessage', new FormControl(''));

    this.form.addControl('minValidate', new FormControl());
    this.form.addControl('minValidateMessage', new FormControl(''));

    this.form.addControl('maxValidate', new FormControl());
    this.form.addControl('maxValidateMessage', new FormControl(''));

    this.form.addControl('minLenValidate', new FormControl());
    this.form.addControl('minLenValidateMessage', new FormControl(''));

    this.form.addControl('maxLenValidate', new FormControl());
    this.form.addControl('maxLenValidateMessage', new FormControl(''));

    if (!this.textboxProperties) {
      this.changeType();
      return;
    }

    const properties: ITextBoxModel = this.textboxProperties.properties;

    this.form.controls['order'].setValue(properties.order);
    this.form.controls['name'].setValue(properties.name);
    this.form.controls['label'].setValue(properties.label);
    this.form.controls['type'].setValue(properties.type);
    this.form.controls['placeholder'].setValue(properties.placeholder);
    this.form.controls['class'].setValue(properties.class);
    this.form.controls['userDefinedId'].setValue(properties.userDefinedId);
    this.form.controls['value'].setValue(properties.value);
    this.form.controls['isReadOnly'].setValue(properties.isReadOnly);
    this.form.controls['isHidden'].setValue(properties.isHidden);
    this.form.controls['isRequired'].setValue(properties.isRequired);
    this.form.controls['requiredMessage'].setValue(properties.requiredMessage);

    if (properties.regexValidation) {
      this.form.controls['regex'].setValue(
        properties.regexValidation.expression
      );
      this.form.controls['regexMessage'].setValue(
        properties.regexValidation.message
      );
    }

    if (properties.validations) {
      this.initializeBuiltInValidationFields(properties.validations);
    }

    this.changeType();
  }

  private initializeBuiltInValidationFields(
    validations: {
      type: string;
      min?: number | null | undefined;
      max?: number | null | undefined;
      minChar?: number | null | undefined;
      maxChar?: number | null | undefined;
      message: string;
    }[]
  ): void {
    for (const element of validations) {
      const { type, min, max, minChar, maxChar, message } = element;

      if (type === this.availableValidations[0]) {
        this.form.controls['isEmailValidate'].setValue(true);
        this.form.controls['emailValidationMessage'].setValue(message);
      } else if (type === this.availableValidations[1]) {
        this.form.controls['minValidate'].setValue(min);
        this.form.controls['minValidateMessage'].setValue(message);
      } else if (type === this.availableValidations[2]) {
        this.form.controls['maxValidate'].setValue(max);
        this.form.controls['maxValidateMessage'].setValue(message);
      } else if (type === this.availableValidations[3]) {
        this.form.controls['minLenValidate'].setValue(minChar);
        this.form.controls['minLenValidateMessage'].setValue(message);
      } else if (type === this.availableValidations[4]) {
        this.form.controls['maxLenValidate'].setValue(maxChar);
        this.form.controls['maxLenValidateMessage'].setValue(message);
      }
    }
  }

  changeType(): void {
    const type: string = this.form.controls['type'].value;

    if (type === '') {
      this.checkValidationCanUse();
      return;
    }

    this.toUseValidations = this.getToUseValidations(type);
    this.checkValidationCanUse();
  }

  private getToUseValidations(selectedType: string): string[] {
    const found: { type: string; validations: string[] } | undefined =
      TEXTBOX_UTILITIES.TEXTBOX_TYPES.find(
        (value: { type: string; validations: string[] }) =>
          selectedType === value.type
      );

    if (!found) {
      return [];
    }

    return found.validations;
  }

  private checkValidationCanUse(): void {
    this.canUseEmailValidation = false;
    this.canUseMinValidation = false;
    this.canUseMaxValidation = false;
    this.canUseMinLenValidation = false;
    this.canUseMaxLenValidation = false;

    for (const element of this.toUseValidations) {
      if (element === this.availableValidations[0]) {
        this.canUseEmailValidation = true;
      }

      if (element === this.availableValidations[1]) {
        this.canUseMinValidation = true;
      }

      if (element === this.availableValidations[2]) {
        this.canUseMaxValidation = true;
      }

      if (element === this.availableValidations[3]) {
        this.canUseMinLenValidation = true;
      }

      if (element === this.availableValidations[4]) {
        this.canUseMaxLenValidation = true;
      }
    }
  }
}
