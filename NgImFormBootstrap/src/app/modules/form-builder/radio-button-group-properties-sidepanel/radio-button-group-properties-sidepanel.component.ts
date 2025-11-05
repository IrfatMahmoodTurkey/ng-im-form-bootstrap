import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRadioButtonGroupPropertiesInputEmitModel } from '../../../models/radio-button-group-properties-input-emit.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgImFormRadioButtonGroupModel } from '../../../models/horizontal-form.model';

@Component({
  selector: 'app-radio-button-group-properties-sidepanel',
  templateUrl: './radio-button-group-properties-sidepanel.component.html',
  styleUrl: '../form-builder.component.scss',
})
export class RadioButtonGroupPropertiesSidepanelComponent implements OnInit {
  @Input() radioButtonGroupProperties:
    | IRadioButtonGroupPropertiesInputEmitModel
    | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output()
  saveChangesEvent: EventEmitter<IRadioButtonGroupPropertiesInputEmitModel> =
    new EventEmitter();

  form: FormGroup = new FormGroup({});

  isSubmitClicked: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      label: ['', [Validators.required]],
      class: [''],
      validationErrorClass: ['', [Validators.required]],
      isReadOnly: [false],
      isHidden: [false],
      isRequired: [false],
      requiredMessage: [''],
      valueTexts: this.formBuilder.array([]),
    });

    if (!this.radioButtonGroupProperties) {
      return;
    }

    const properties: INgImFormRadioButtonGroupModel =
      this.radioButtonGroupProperties.properties;

    this.form.controls['name'].setValue(properties.name);
    this.form.controls['label'].setValue(properties.label);
    this.form.controls['class'].setValue(properties.class);
    this.form.controls['validationErrorClass'].setValue(
      properties.validationErrorClass
    );
    this.form.controls['isReadOnly'].setValue(properties.isReadOnly);
    this.form.controls['isHidden'].setValue(properties.isHidden);
    this.form.controls['isRequired'].setValue(properties.isRequired);
    this.form.controls['requiredMessage'].setValue(properties.requiredMessage);

    this.valueTexts.clear();

    if (properties.radioButtons) {
      if (properties.radioButtons.length > 0) {
        for (const element of properties.radioButtons) {
          this.addValueText({
            checked: element.checked,
            value: element.value,
            text: element.text,
          });
        }
      }
    }
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }

  public addValueText(
    valueText: { checked: boolean; value: string; text: string } | null
  ): void {
    if (!valueText) {
      this.valueTexts.push(
        this.formBuilder.group({
          checked: [false],
          value: [''],
          text: [''],
        })
      );

      return;
    }

    this.valueTexts.push(
      this.formBuilder.group({
        checked: [valueText.checked],
        value: [valueText.value],
        text: [valueText.text],
      })
    );
  }

  public removeItem(index: number): void {
    if (this.valueTexts.length <= 1) return;

    this.valueTexts.removeAt(index);
  }

  get valueTexts(): FormArray {
    return this.form.get('valueTexts') as FormArray;
  }

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid) {
      return;
    }

    if (!this.radioButtonGroupProperties) {
      return;
    }

    const [
      name,
      label,
      className,
      validationErrorClass,
      isReadOnly,
      isHidden,
      isRequired,
      requiredMessage,
    ] = [
      this.form.controls['name'].value,
      this.form.controls['label'].value,
      this.form.controls['class'].value,
      this.form.controls['validationErrorClass'].value,
      this.form.controls['isReadOnly'].value,
      this.form.controls['isHidden'].value,
      this.form.controls['isRequired'].value,
      this.form.controls['requiredMessage'].value,
    ];

    let radioButtons: {
      checked: boolean;
      value: string;
      text: string;
    }[] = [];

    radioButtons = this.form.value.valueTexts.map((value: any) => {
      return {
        checked: value.checked,
        value: value.value,
        text: value.value,
      };
    });

    this.saveChangesEvent.emit({
      sectionId: this.radioButtonGroupProperties.sectionId,
      radioButtonGroupId: this.radioButtonGroupProperties.radioButtonGroupId,
      properties: {
        id: this.radioButtonGroupProperties.radioButtonGroupId,
        name,
        label,
        class: className,
        validationErrorClass,
        isReadOnly,
        isHidden,
        isRequired,
        requiredMessage,
        radioButtons,
      },
    });

    this.hide();
  }
}
