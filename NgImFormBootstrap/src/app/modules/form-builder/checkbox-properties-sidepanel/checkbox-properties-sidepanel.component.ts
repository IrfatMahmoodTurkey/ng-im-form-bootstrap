import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICheckboxPropertiesInputEmitModel } from '../../../models/checkbox-properties-input-emit.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICheckBoxModel } from '../../../models/horizontal-form.model';

@Component({
  selector: 'app-checkbox-properties-sidepanel',
  templateUrl: './checkbox-properties-sidepanel.component.html',
  styleUrl: '../form-builder.component.scss',
})
export class CheckboxPropertiesSidepanelComponent implements OnInit {
  @Input() checkboxProperties: ICheckboxPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<ICheckboxPropertiesInputEmitModel> =
    new EventEmitter();

  form: FormGroup = new FormGroup({});

  isSubmitClicked: boolean = false;

  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }

  private initializeForm(): void {
    this.form.addControl('name', new FormControl('', [Validators.required]));
    this.form.addControl('label', new FormControl('', [Validators.required]));
    this.form.addControl('class', new FormControl(''));
    this.form.addControl('validationErrorClass', new FormControl(''));
    this.form.addControl('checked', new FormControl(false));
    this.form.addControl('isReadOnly', new FormControl(false));
    this.form.addControl('isHidden', new FormControl(false));
    this.form.addControl('isRequired', new FormControl(false));
    this.form.addControl('requiredMessage', new FormControl(''));

    if (!this.checkboxProperties) {
      return;
    }

    const properties: ICheckBoxModel = this.checkboxProperties.properties;

    this.form.controls['name'].setValue(properties.name);
    this.form.controls['label'].setValue(properties.label);
    this.form.controls['class'].setValue(properties.class);
    this.form.controls['validationErrorClass'].setValue(
      properties.validationErrorClass
    );
    this.form.controls['checked'].setValue(properties.checked);
    this.form.controls['isReadOnly'].setValue(properties.isReadOnly);
    this.form.controls['isHidden'].setValue(properties.isHidden);
    this.form.controls['isRequired'].setValue(properties.isRequired);
    this.form.controls['requiredMessage'].setValue(properties.requiredMessage);
  }

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid) {
      return;
    }

    if (!this.checkboxProperties) {
      return;
    }

    const [
      name,
      label,
      className,
      validationErrorClass,
      checked,
      isReadOnly,
      isHidden,
      isRequired,
      requiredMessage,
    ] = [
      this.form.controls['name'].value,
      this.form.controls['label'].value,
      this.form.controls['class'].value,
      this.form.controls['validationErrorClass'].value,
      this.form.controls['checked'].value,
      this.form.controls['isReadOnly'].value,
      this.form.controls['isHidden'].value,
      this.form.controls['isRequired'].value,
      this.form.controls['requiredMessage'].value,
    ];

    this.saveChangesEvent.emit({
      sectionId: this.checkboxProperties.sectionId,
      checkboxId: this.checkboxProperties.checkboxId,
      properties: {
        id: this.checkboxProperties.checkboxId,
        name,
        label,
        class: className,
        validationErrorClass,
        checked,
        isReadOnly,
        isHidden,
        isRequired,
        requiredMessage,
      },
    });

    this.hide();
  }
}
