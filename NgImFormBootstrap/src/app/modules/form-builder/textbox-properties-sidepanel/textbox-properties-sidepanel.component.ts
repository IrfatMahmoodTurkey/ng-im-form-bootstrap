import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITextboxPropertiesInputEmitModel } from '../../../models/textbox-properties-input-emit.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IHorizontalFormModel,
  ITextBoxModel,
} from '../../../models/horizontal-form.model';
import {
  TEXTBOX_TYPES,
  TextboxValidationsEnum,
} from '../../../constants/textbox-utilities.constant';
import { checkNameExistance } from '../../../helpers/existance.helper';

@Component({
  selector: 'app-textbox-properties-sidepanel',
  templateUrl: './textbox-properties-sidepanel.component.html',
})
export class TextboxPropertiesSidepanelComponent implements OnInit {
  textboxTypes: { type: string; validations: string[] }[] = TEXTBOX_TYPES;

  @Input() horizontalForm: IHorizontalFormModel | undefined;
  @Input() textboxProperties: ITextboxPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<ITextboxPropertiesInputEmitModel> =
    new EventEmitter();

  form: FormGroup = new FormGroup({});

  availableValidations: string[] = [
    TextboxValidationsEnum.EMAIL,
    TextboxValidationsEnum.MIN,
    TextboxValidationsEnum.MAX,
    TextboxValidationsEnum.MIN_LEN,
    TextboxValidationsEnum.MAX_LEN,
  ];

  toUseValidations: string[] = [];

  canUseEmailValidation: boolean = false;
  canUseMinValidation: boolean = false;
  canUseMaxValidation: boolean = false;
  canUseMinLenValidation: boolean = false;
  canUseMaxLenValidation: boolean = false;

  isSubmitClicked: boolean = false;
  isNameExists: boolean = false;

  constructor() {}

  ngOnInit() {
    if (!this.horizontalForm) {
      console.error('Horizontal Form object is required!');
    }

    if (!this.textboxProperties) {
      console.error('Textbox Properties object is required!');
    }

    this.initializeForm();
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }

  private initializeForm(): void {
    this.form.addControl('name', new FormControl('', [Validators.required]));
    this.form.addControl('label', new FormControl('', [Validators.required]));
    this.form.addControl('type', new FormControl('', [Validators.required]));
    this.form.addControl('placeholder', new FormControl(''));
    this.form.addControl('class', new FormControl(''));
    this.form.addControl('validationErrorClass', new FormControl(''));
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

    this.form.controls['name'].setValue(properties.name);
    this.form.controls['label'].setValue(properties.label);
    this.form.controls['type'].setValue(properties.type);
    this.form.controls['placeholder'].setValue(properties.placeholder);
    this.form.controls['class'].setValue(properties.class);
    this.form.controls['validationErrorClass'].setValue(
      properties.validationErrorClass
    );
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
      TEXTBOX_TYPES.find(
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

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid || this.isNameExists) {
      return;
    }

    if (!this.textboxProperties) {
      return;
    }

    const [
      name,
      label,
      type,
      placeholder,
      className,
      validationErrorClass,
      value,
      isReadOnly,
      isHidden,
      isRequired,
      requiredMessage,
      isEmailValidate,
      emailValidationMessage,
      minValidate,
      minValidateMessage,
      maxValidate,
      maxValidateMessage,
      minLenValidate,
      minLenValidateMessage,
      maxLenValidate,
      maxLenValidateMessage,
      regex,
      regexMessage,
    ] = [
      this.form.controls['name'].value,
      this.form.controls['label'].value,
      this.form.controls['type'].value,
      this.form.controls['placeholder'].value,
      this.form.controls['class'].value,
      this.form.controls['validationErrorClass'].value,
      this.form.controls['value'].value,
      this.form.controls['isReadOnly'].value,
      this.form.controls['isHidden'].value,
      this.form.controls['isRequired'].value,
      this.form.controls['requiredMessage'].value,
      this.form.controls['isEmailValidate'].value,
      this.form.controls['emailValidationMessage'].value,
      this.form.controls['minValidate'].value,
      this.form.controls['minValidateMessage'].value,
      this.form.controls['maxValidate'].value,
      this.form.controls['maxValidateMessage'].value,
      this.form.controls['minLenValidate'].value,
      this.form.controls['minLenValidateMessage'].value,
      this.form.controls['maxLenValidate'].value,
      this.form.controls['maxLenValidateMessage'].value,
      this.form.controls['regex'].value,
      this.form.controls['regexMessage'].value,
    ];

    let validations: {
      type: string;
      min?: number | null | undefined;
      max?: number | null | undefined;
      minChar?: number | null | undefined;
      maxChar?: number | null | undefined;
      message: string;
    }[] = [];

    if (isEmailValidate) {
      validations.push({
        type: this.availableValidations[0],
        min: null,
        max: null,
        minChar: null,
        maxChar: null,
        message: emailValidationMessage,
      });
    }

    if (minValidate || minValidate === 0) {
      validations.push({
        type: this.availableValidations[1],
        min: minValidate,
        max: null,
        minChar: null,
        maxChar: null,
        message: minValidateMessage,
      });
    }

    if (maxValidate || maxValidate === 0) {
      validations.push({
        type: this.availableValidations[2],
        max: maxValidate,
        min: null,
        minChar: null,
        maxChar: null,
        message: maxValidateMessage,
      });
    }

    if (minLenValidate || minLenValidate === 0) {
      validations.push({
        type: this.availableValidations[3],
        minChar: minLenValidate,
        min: null,
        max: null,
        maxChar: null,
        message: minLenValidateMessage,
      });
    }

    if (maxLenValidate || maxLenValidate === 0) {
      validations.push({
        type: this.availableValidations[4],
        maxChar: maxLenValidate,
        min: null,
        max: null,
        minChar: null,
        message: maxLenValidateMessage,
      });
    }

    this.saveChangesEvent.emit({
      sectionId: this.textboxProperties.sectionId,
      textboxId: this.textboxProperties.textboxId,
      properties: {
        id: this.textboxProperties.textboxId,
        name,
        label,
        type,
        placeholder,
        class: className,
        validationErrorClass,
        value,
        isReadOnly,
        isHidden,
        isRequired,
        requiredMessage,
        validations: validations,
        regexValidation: {
          expression: regex,
          message: regexMessage,
        },
      },
    });

    this.hide();
  }

  checkNameExistance(): void {
    if (!this.horizontalForm) return;

    const name: string = this.form.controls['name'].value;

    this.isNameExists = checkNameExistance(
      this.horizontalForm,
      this.textboxProperties?.properties.name ?? '',
      name
    );
  }
}
