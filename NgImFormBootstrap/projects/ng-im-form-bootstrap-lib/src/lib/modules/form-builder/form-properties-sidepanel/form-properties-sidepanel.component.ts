import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHorizontalFormModel } from '../../../models/horizontal-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIMethodsEnum } from '../../../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../../../enums/send-body-types.enum';

@Component({
  selector: 'app-form-properties-sidepanel',
  templateUrl: './form-properties-sidepanel.component.html',
})
export class FormPropertiesSidepanelComponent implements OnInit {
  apiMethods: string[] = [
    APIMethodsEnum.PATCH,
    APIMethodsEnum.PUT,
    APIMethodsEnum.POST,
  ];

  sendBodyTypes: string[] = [
    SendBodyTypesEnum.JSON,
    SendBodyTypesEnum.FORM_DATA,
  ];

  @Input() formProperties: IHorizontalFormModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<IHorizontalFormModel> =
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
    this.form.addControl('checkValidations', new FormControl(false));
    this.form.addControl('isResetButtonAvailable', new FormControl(false));
    this.form.addControl(
      'submitAPIUrl',
      new FormControl('', [Validators.required])
    );
    this.form.addControl(
      'method',
      new FormControl(this.apiMethods[0], [Validators.required])
    );
    this.form.addControl(
      'sendBodyAs',
      new FormControl(this.sendBodyTypes[0], [Validators.required])
    );
    this.form.addControl('successTitle', new FormControl(''));
    this.form.addControl('successSubTitle', new FormControl(''));
    this.form.addControl('failedTitle', new FormControl(''));
    this.form.addControl('failedSubTitle', new FormControl(''));

    if (!this.formProperties) {
      return;
    }

    const properties: IHorizontalFormModel = this.formProperties;

    this.form.controls['checkValidations'].setValue(
      properties.checkValidations
    );
    this.form.controls['isResetButtonAvailable'].setValue(
      properties.isResetButtonAvailable
    );
    this.form.controls['submitAPIUrl'].setValue(properties.submitAPIUrl);
    this.form.controls['method'].setValue(properties.method);
    this.form.controls['sendBodyAs'].setValue(properties.sendBodyAs);
    this.form.controls['successTitle'].setValue(
      properties.responseMessages.onSuccess.title
    );
    this.form.controls['successSubTitle'].setValue(
      properties.responseMessages.onSuccess.subTitle
    );
    this.form.controls['failedTitle'].setValue(
      properties.responseMessages.onFailed.title
    );
    this.form.controls['failedSubTitle'].setValue(
      properties.responseMessages.onFailed.subTitle
    );
  }

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid) {
      return;
    }

    if (!this.formProperties) {
      return;
    }

    const [
      checkValidations,
      isResetButtonAvailable,
      submitAPIUrl,
      method,
      sendBodyAs,
      successTitle,
      successSubTitle,
      failedTitle,
      failedSubTitle,
    ] = [
      this.form.controls['checkValidations'].value,
      this.form.controls['isResetButtonAvailable'].value,
      this.form.controls['submitAPIUrl'].value,
      this.form.controls['method'].value,
      this.form.controls['sendBodyAs'].value,
      this.form.controls['successTitle'].value,
      this.form.controls['successSubTitle'].value,
      this.form.controls['failedTitle'].value,
      this.form.controls['failedSubTitle'].value,
    ];

    this.saveChangesEvent.emit({
      checkValidations,
      isResetButtonAvailable,
      submitAPIUrl,
      method,
      sendBodyAs,
      responseMessages: {
        onSuccess: {
          title: successTitle,
          subTitle: successSubTitle,
        },
        onFailed: {
          title: failedTitle,
          subTitle: failedSubTitle,
        },
      },
      sections: this.formProperties.sections,
    });

    this.hide();
  }
}
