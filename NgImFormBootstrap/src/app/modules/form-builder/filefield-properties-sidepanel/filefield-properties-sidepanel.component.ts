import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFileFieldPropertiesInputEmitModel } from '../../../models/filefield-properties-input-emit.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFileFieldModel } from '../../../models/horizontal-form.model';

@Component({
  selector: 'app-filefield-properties-sidepanel',
  templateUrl: './filefield-properties-sidepanel.component.html',
})
export class FilefieldPropertiesSidepanelComponent implements OnInit {
  @Input() fileFieldProperties: IFileFieldPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<IFileFieldPropertiesInputEmitModel> =
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
      validationErrorClass: [''],
      accept: [''],
      isMultiple: [false],
      isReadOnly: [false],
      isHidden: [false],
      isRequired: [false],
      requiredMessage: [''],
      sizeValidation: [],
      sizeValidationMessage: [],
      extensionValidations: this.formBuilder.array([]),
    });

    if (!this.fileFieldProperties) {
      return;
    }

    const properties: IFileFieldModel = this.fileFieldProperties.properties;

    this.form.controls['name'].setValue(properties.name);
    this.form.controls['label'].setValue(properties.label);
    this.form.controls['class'].setValue(properties.class);
    this.form.controls['validationErrorClass'].setValue(
      properties.validationErrorClass
    );
    this.form.controls['accept'].setValue(properties.accept);
    this.form.controls['isMultiple'].setValue(properties.isMultiple);
    this.form.controls['isReadOnly'].setValue(properties.isReadOnly);
    this.form.controls['isHidden'].setValue(properties.isHidden);
    this.form.controls['isRequired'].setValue(properties.isRequired);
    this.form.controls['requiredMessage'].setValue(properties.requiredMessage);

    if (properties.sizeValidation) {
      this.form.controls['sizeValidation'].setValue(
        properties.sizeValidation.size
      );
      this.form.controls['sizeValidationMessage'].setValue(
        properties.sizeValidation.message
      );
    }

    this.extensionValidations.clear();

    if (properties.extensionValidations) {
      if (properties.extensionValidations.length > 0) {
        for (const element of properties.extensionValidations) {
          this.addExtensionValidation({
            extension: element.extension,
            message: element.message,
          });
        }
      }
    }
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }

  public addExtensionValidation(
    validation: { extension: string; message: string } | null
  ): void {
    if (!validation) {
      this.extensionValidations.push(
        this.formBuilder.group({
          extension: [''],
          message: [''],
        })
      );

      return;
    }

    this.extensionValidations.push(
      this.formBuilder.group({
        extension: [validation.extension],
        message: [validation.message],
      })
    );
  }

  public removeItem(index: number): void {
    if (this.extensionValidations.length <= 0) return;

    this.extensionValidations.removeAt(index);
  }

  get extensionValidations(): FormArray {
    return this.form.get('extensionValidations') as FormArray;
  }

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid) {
      return;
    }

    if (!this.fileFieldProperties) {
      return;
    }

    const [
      name,
      label,
      className,
      validationErrorClass,
      accept,
      isMultiple,
      isReadOnly,
      isHidden,
      isRequired,
      requiredMessage,
      sizeValidation,
      sizeValidationMessage,
    ] = [
      this.form.controls['name'].value,
      this.form.controls['label'].value,
      this.form.controls['class'].value,
      this.form.controls['validationErrorClass'].value,
      this.form.controls['accept'].value,
      this.form.controls['isMultiple'].value,
      this.form.controls['isReadOnly'].value,
      this.form.controls['isHidden'].value,
      this.form.controls['isRequired'].value,
      this.form.controls['requiredMessage'].value,
      this.form.controls['sizeValidation'].value,
      this.form.controls['sizeValidationMessage'].value,
    ];

    let extensionValidations: {
      extension: string;
      message: string;
    }[] = [];

    extensionValidations = this.form.value.extensionValidations.map(
      (value: any) => {
        return {
          extension: value.extension,
          message: value.message,
        };
      }
    );

    this.saveChangesEvent.emit({
      sectionId: this.fileFieldProperties.sectionId,
      fileFieldId: this.fileFieldProperties.fileFieldId,
      properties: {
        id: this.fileFieldProperties.fileFieldId,
        name,
        label,
        class: className,
        validationErrorClass,
        accept,
        isMultiple,
        isReadOnly,
        isHidden,
        isRequired,
        requiredMessage,
        sizeValidation: sizeValidation
          ? {
              size: sizeValidation,
              message: sizeValidationMessage,
            }
          : null,
        extensionValidations: extensionValidations,
      },
    });

    this.hide();
  }
}
