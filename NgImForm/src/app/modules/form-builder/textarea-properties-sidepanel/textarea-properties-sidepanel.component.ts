import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITextareaPropertiesInputEmitModel } from '../../../models/textarea-properties-input-emit.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TEXTAREA_UTILITIES } from '../../../constants/textarea-utilities.constant';
import { ITextAreaModel } from '../../../models/horizontal-form.model';

@Component({
  selector: 'app-textarea-properties-sidepanel',
  templateUrl: './textarea-properties-sidepanel.component.html',
})
export class TextareaPropertiesSidepanelComponent implements OnInit {
  @Input() textareaProperties: ITextareaPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<ITextareaPropertiesInputEmitModel> =
    new EventEmitter();

  form: FormGroup = new FormGroup({});

  availableValidations: string[] = [
    TEXTAREA_UTILITIES.TextareaValidationsEnum.MIN_LEN,
    TEXTAREA_UTILITIES.TextareaValidationsEnum.MAX_LEN,
  ];

  toUseValidations: string[] = [];

  isSubmitClicked: boolean = false;

  constructor() {}

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
    this.form.addControl('rows', new FormControl(10, [Validators.required]));
    this.form.addControl('columns', new FormControl());
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

    this.form.addControl('minLenValidate', new FormControl());
    this.form.addControl('minLenValidateMessage', new FormControl(''));

    this.form.addControl('maxLenValidate', new FormControl());
    this.form.addControl('maxLenValidateMessage', new FormControl(''));

    if (!this.textareaProperties) {
      return;
    }

    const properties: ITextAreaModel = this.textareaProperties.properties;

    this.form.controls['order'].setValue(properties.order);
    this.form.controls['name'].setValue(properties.name);
    this.form.controls['label'].setValue(properties.label);
    this.form.controls['rows'].setValue(properties.rows);
    this.form.controls['columns'].setValue(properties.columns);
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
      const { type, minChar, maxChar, message } = element;

      if (type === this.availableValidations[0]) {
        this.form.controls['minLenValidate'].setValue(minChar);
        this.form.controls['minLenValidateMessage'].setValue(message);
      } else if (type === this.availableValidations[1]) {
        this.form.controls['maxLenValidate'].setValue(maxChar);
        this.form.controls['maxLenValidateMessage'].setValue(message);
      }
    }
  }

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid) {
      return;
    }

    if (!this.textareaProperties) {
      return;
    }

    const [
      order,
      name,
      label,
      rows,
      columns,
      placeholder,
      className,
      userDefinedId,
      value,
      isReadOnly,
      isHidden,
      isRequired,
      requiredMessage,
      minLenValidate,
      minLenValidateMessage,
      maxLenValidate,
      maxLenValidateMessage,
      regex,
      regexMessage,
    ] = [
      this.form.controls['order'].value,
      this.form.controls['name'].value,
      this.form.controls['label'].value,
      this.form.controls['rows'].value,
      this.form.controls['columns'].value,
      this.form.controls['placeholder'].value,
      this.form.controls['class'].value,
      this.form.controls['userDefinedId'].value,
      this.form.controls['value'].value,
      this.form.controls['isReadOnly'].value,
      this.form.controls['isHidden'].value,
      this.form.controls['isRequired'].value,
      this.form.controls['requiredMessage'].value,
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

    if (minLenValidate || minLenValidate === 0) {
      validations.push({
        type: this.availableValidations[0],
        minChar: minLenValidate,
        min: null,
        max: null,
        maxChar: null,
        message: minLenValidateMessage,
      });
    }

    if (maxLenValidate || maxLenValidate === 0) {
      validations.push({
        type: this.availableValidations[1],
        maxChar: maxLenValidate,
        min: null,
        max: null,
        minChar: null,
        message: maxLenValidateMessage,
      });
    }

    this.saveChangesEvent.emit({
      sectionId: this.textareaProperties.sectionId,
      textareaId: this.textareaProperties.textareaId,
      properties: {
        id: this.textareaProperties.textareaId,
        order: order,
        name,
        label,
        rows,
        columns,
        placeholder,
        class: className,
        userDefinedId,
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
}
