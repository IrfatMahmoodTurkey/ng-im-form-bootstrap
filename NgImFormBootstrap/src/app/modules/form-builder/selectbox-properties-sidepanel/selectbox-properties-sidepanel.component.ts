import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISelectboxPropertiesInputEmitModel } from '../../../models/selectbox-properties-input-emit.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISelectBoxModel } from '../../../models/horizontal-form.model';

@Component({
  selector: 'app-selectbox-properties-sidepanel',
  templateUrl: './selectbox-properties-sidepanel.component.html',
})
export class SelectboxPropertiesSidepanelComponent implements OnInit {
  @Input() selectBoxProperties: ISelectboxPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<ISelectboxPropertiesInputEmitModel> =
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
      placeholder: [''],
      class: [''],
      validationErrorClass: [''],
      isMultiple: [false],
      isReadOnly: [false],
      isHidden: [false],
      isRequired: [false],
      requiredMessage: [''],
      valueTexts: this.formBuilder.array([]),
    });

    if (!this.selectBoxProperties) {
      return;
    }

    const properties: ISelectBoxModel = this.selectBoxProperties.properties;

    this.form.controls['name'].setValue(properties.name);
    this.form.controls['label'].setValue(properties.label);
    this.form.controls['placeholder'].setValue(properties.placeholder);
    this.form.controls['class'].setValue(properties.class);
    this.form.controls['validationErrorClass'].setValue(
      properties.validationErrorClass
    );
    this.form.controls['isMultiple'].setValue(properties.isMultiple);
    this.form.controls['isReadOnly'].setValue(properties.isReadOnly);
    this.form.controls['isHidden'].setValue(properties.isHidden);
    this.form.controls['isRequired'].setValue(properties.isRequired);
    this.form.controls['requiredMessage'].setValue(properties.requiredMessage);

    this.valueTexts.clear();

    if (properties.options) {
      if (properties.options.length > 0) {
        for (const element of properties.options) {
          this.addValueText({
            selected: element.selected,
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
    valueText: { selected: boolean; value: string; text: string } | null
  ): void {
    if (!valueText) {
      this.valueTexts.push(
        this.formBuilder.group({
          selected: [false],
          value: [''],
          text: [''],
        })
      );

      return;
    }

    this.valueTexts.push(
      this.formBuilder.group({
        selected: [valueText.selected],
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

    if (!this.selectBoxProperties) {
      return;
    }

    const [
      name,
      label,
      placeholder,
      className,
      validationErrorClass,
      isMultiple,
      isReadOnly,
      isHidden,
      isRequired,
      requiredMessage,
    ] = [
      this.form.controls['name'].value,
      this.form.controls['label'].value,
      this.form.controls['placeholder'].value,
      this.form.controls['class'].value,
      this.form.controls['validationErrorClass'].value,
      this.form.controls['isMultiple'].value,
      this.form.controls['isReadOnly'].value,
      this.form.controls['isHidden'].value,
      this.form.controls['isRequired'].value,
      this.form.controls['requiredMessage'].value,
    ];

    let options: {
      selected: boolean;
      value: string;
      text: string;
    }[] = [];

    options = this.form.value.valueTexts.map((value: any) => {
      return {
        selected: value.selected,
        value: value.value,
        text: value.value,
      };
    });

    this.saveChangesEvent.emit({
      sectionId: this.selectBoxProperties.sectionId,
      selectBoxId: this.selectBoxProperties.selectBoxId,
      properties: {
        id: this.selectBoxProperties.selectBoxId,
        name,
        label,
        placeholder,
        class: className,
        validationErrorClass,
        isMultiple,
        isReadOnly,
        isHidden,
        isRequired,
        requiredMessage,
        options,
      },
    });

    this.hide();
  }
}
