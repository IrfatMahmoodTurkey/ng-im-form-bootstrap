import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITextboxPropertiesInputEmitModel } from '../../../models/textbox-properties-input-emit.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TEXTBOX_VALIDATIONS } from '../../../constants/build-in-validations.constant';
import { ITextBoxModel } from '../../../models/horizontal-form.model';

@Component({
  selector: 'app-textbox-properties-sidepanel',
  templateUrl: './textbox-properties-sidepanel.component.html',
})
export class TextboxPropertiesSidepanelComponent implements OnInit {
  textBoxValidations: { title: string; value: string }[] = TEXTBOX_VALIDATIONS;

  @Input() textboxProperties: ITextboxPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      order: [1, [Validators.required]],
      name: ['', [Validators.required]],
      label: ['', [Validators.required]],
      type: ['text'],
      placeholder: [''],
      class: [''],
      userDefinedId: ['', [Validators.required]],
      value: [''],
      isReadOnly: [false],
      isHidden: [false],
      isRequired: [false],
      requiredMessage: [''],
      inputValidations: this.formBuilder.array([]),
      regex: [''],
      regexMessage: [''],
    });

    this.addInputValidation();

    if (!this.textboxProperties) {
      return;
    }

    this.removeInputValidation(0);

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
      for (const validation of properties.validations) {
        const { type, min, max, minChar, maxChar, message } = validation;

        this.addAndInitializeInputValidation({
          type,
          min,
          max,
          minChar,
          maxChar,
          message,
        });
      }
    }
  }

  public addInputValidation(): void {
    this.inputValidations.push(
      this.formBuilder.group({
        validationType: [''],
        min: [],
        max: [],
        minLength: [],
        maxLength: [],
        message: [''],
      })
    );
  }

  public addAndInitializeInputValidation(validation: {
    type: string;
    min: number | null;
    max: number | null;
    minChar: number | null;
    maxChar: number | null;
    message: string | null;
  }): void {
    this.inputValidations.push(
      this.formBuilder.group({
        validationType: [validation.type],
        min: [validation.min],
        max: [validation.min],
        minLength: [validation.minChar],
        maxLength: [validation.maxChar],
        message: [validation.message],
      })
    );
  }

  public removeInputValidation(index: number): void {
    if (this.inputValidations.length <= 1) return;

    this.inputValidations.removeAt(index);
  }

  get inputValidations(): FormArray {
    return this.form.get('inputValidations') as FormArray;
  }
}
