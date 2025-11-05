import { Component, Input, OnInit } from '@angular/core';
import {
  INgImFormCheckBoxModel,
  INgImFormElementModel,
  INgImFormFileFieldModel,
  INgImHorizonatalFormSectionModel,
  INgImHorizontalFormModel,
  INgImFormRadioButtonGroupModel,
  INgImFormSelectBoxModel,
  INgImFormTextAreaModel,
  INgImFormTextBoxModel,
} from '../../models/horizontal-form.model';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TextboxValidationsEnum } from '../../constants/textbox-utilities.constant';
import { ALIGNMENTS } from '../../constants/alignments.constant';
import { APICallService } from '../services/api-call.service';
import { APIMethodsEnum } from '../../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../../enums/send-body-types.enum';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css'],
})
export class FormPreviewComponent implements OnInit {
  alignments: string[] = ALIGNMENTS;

  @Input() preset: INgImHorizontalFormModel | null | undefined;

  sections: INgImHorizonatalFormSectionModel[] = [];

  form: FormGroup = new FormGroup({});
  isSubmitClicked: boolean = false;

  textboxValidationEnum = TextboxValidationsEnum;

  browsedFiles: Map<
    string,
    {
      name: string;
      required: boolean;
      requiredMessage: string | null;
      isMultiple: boolean;
      files: File[];
      hasFiles: boolean;
      sizeValid: boolean;
      sizeValidationMessage: string | null;
      extensionsValid: boolean;
      extendsionValidationMessages: string[];
      everythingIsValid: boolean;
    }
  > = new Map();

  formSubscription: Subscription | undefined;

  response: {
    isViewAlert: boolean;
    successMessage: string | undefined;
    failedMessage:
      | {
          message: string | undefined;
          details: string | undefined;
        }
      | undefined;
  } = {
    isViewAlert: false,
    successMessage: undefined,
    failedMessage: undefined,
  };
  messageTimeout: any;

  isSubmitProcessing: boolean = false;

  constructor(private apiCallService: APICallService) {}

  ngOnInit() {
    if (!this.preset) {
      console.error('Must need a form object to initialze the form!');
      return;
    }

    this.sections = this.preset.sections;
    this.buildForm();
    this.initializeFileFieldUtilities();
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }

  disapperResponseAlert(): void {
    this.messageTimeout = setTimeout(() => {
      this.response = {
        isViewAlert: false,
        successMessage: undefined,
        failedMessage: undefined,
      };
    }, 5000);
  }

  submit(): void {
    if (!this.preset) {
      console.error('Must need a form object to initialze the form!');
      return;
    }

    if (!this.preset.checkValidations) {
      this.extractFormData();
      return;
    }

    this.isSubmitClicked = true;

    const filesValid: boolean = this.isFilesValid();
    if (this.form.valid && filesValid) {
      this.extractFormData();
    }
  }

  isFilesValid(): boolean {
    const size: number = this.browsedFiles.size;

    if (size <= 0) {
      return true;
    }

    for (const pair of this.browsedFiles) {
      const [key, value] = pair;

      if (!value.everythingIsValid) {
        return false;
      }
    }

    return true;
  }

  private extractFormData() {
    let toPost: any = {};

    for (const key in this.form.controls) {
      const value: any = this.form.controls[key].value;

      toPost[key] = value;
    }

    for (const browsedFilePair of this.browsedFiles) {
      const [key, value] = browsedFilePair;

      if (value.isMultiple) {
        toPost[value.name] = value.files;
      } else {
        toPost[value.name] = value.files.length > 0 ? value.files[0] : null;
      }
    }

    this.post(toPost);
  }

  private post(toPost: any): void {
    if (!toPost) {
      return;
    }

    if (!this.preset) {
      return;
    }

    const { submitAPIUrl, sendBodyAs, method, responseMessages } = this.preset;

    this.send(submitAPIUrl, toPost, sendBodyAs, method, responseMessages);
  }

  private send(
    submitAPIUrl: string,
    object: any,
    sendBodyAs: SendBodyTypesEnum,
    method: APIMethodsEnum,
    responseMessages: {
      onSuccess: {
        title: string;
        subTitle: string;
      };
      onFailed: {
        title: string;
        subTitle: string;
      };
    }
  ): void {
    this.isSubmitProcessing = true;

    let observer: Observable<string> | undefined;

    if (sendBodyAs === SendBodyTypesEnum.JSON) {
      observer = this.apiCallService.sendJSONOnly(submitAPIUrl, object, method);
    } else if (sendBodyAs === SendBodyTypesEnum.FORM_DATA) {
      observer = this.apiCallService.sendFormData(submitAPIUrl, object, method);
    } else {
      this.isSubmitProcessing = false;
      return;
    }

    if (!observer) {
      this.isSubmitProcessing = false;
      return;
    }

    this.formSubscription = observer.subscribe({
      next: (response: string) => {
        this.response = {
          isViewAlert: true,
          successMessage: `${responseMessages.onSuccess.title}. ${responseMessages.onSuccess.subTitle}`,
          failedMessage: undefined,
        };

        this.scrollToTop();
        this.disapperResponseAlert();

        this.isSubmitProcessing = false;
      },
      error: (error: HttpErrorResponse) => {
        this.response = {
          isViewAlert: true,
          successMessage: undefined,
          failedMessage: {
            message: `${responseMessages.onFailed.title}. ${responseMessages.onFailed.subTitle}`,
            details: error.message,
          },
        };

        this.scrollToTop();
        this.disapperResponseAlert();

        this.isSubmitProcessing = false;
      },
    });
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  private buildForm(): void {
    for (const section of this.sections) {
      for (const element of section.elements) {
        this.appendControl(element);
      }
    }
  }

  private appendControl(element: INgImFormElementModel): void {
    if (element.textBoxComponent) {
      this.appendTextBox(element.textBoxComponent);
    } else if (element.textAreaComponent) {
      this.appendTextArea(element.textAreaComponent);
    } else if (element.selectBoxComponent) {
      this.appendSelectBox(element.selectBoxComponent);
    } else if (element.checkBoxComponent) {
      this.appendCheckbox(element.checkBoxComponent);
    } else if (element.radioButtonGroupComponent) {
      this.appendRadioButtonGroup(element.radioButtonGroupComponent);
    }
  }

  private appendTextBox(textbox: INgImFormTextBoxModel): void {
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

  private appendTextArea(textarea: INgImFormTextAreaModel): void {
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

  private initializeFileFieldUtilities(): void {
    if (!this.preset) return;

    for (const section of this.preset.sections) {
      for (const element of section.elements) {
        if (element.fileFieldComponent) {
          this.browsedFiles.set(element.fileFieldComponent.id, {
            name: element.fileFieldComponent.name,
            files: [],
            isMultiple: element.fileFieldComponent.isMultiple,
            hasFiles: false,
            required:
              !element.fileFieldComponent.isHidden &&
              !element.fileFieldComponent.isReadOnly
                ? element.fileFieldComponent.isRequired
                : false,
            requiredMessage: element.fileFieldComponent.requiredMessage,
            sizeValid: true,
            sizeValidationMessage: element.fileFieldComponent.sizeValidation
              ? element.fileFieldComponent.sizeValidation.message
              : null,
            extensionsValid: true,
            extendsionValidationMessages: [],
            everythingIsValid:
              !element.fileFieldComponent.isHidden &&
              !element.fileFieldComponent.isReadOnly
                ? element.fileFieldComponent.isRequired
                  ? false
                  : true
                : true,
          });
        }
      }
    }
  }

  fileChangeEvent(event: any, props: INgImFormFileFieldModel): void {
    if (event.target.files.length <= 0) {
      this.browsedFiles.set(props.id, {
        name: props.name,
        files: [],
        isMultiple: props.isMultiple,
        hasFiles: false,
        required:
          !props.isHidden && !props.isReadOnly ? props.isRequired : false,
        requiredMessage: props.requiredMessage,
        sizeValid: true,
        sizeValidationMessage: props.sizeValidation
          ? props.sizeValidation.message
          : null,
        extensionsValid: true,
        extendsionValidationMessages: [],
        everythingIsValid:
          !props.isHidden && !props.isReadOnly ? props.isRequired : true,
      });

      return;
    }

    let current:
      | {
          name: string;
          required: boolean;
          requiredMessage: string | null;
          files: File[];
          isMultiple: boolean;
          hasFiles: boolean;
          sizeValid: boolean;
          sizeValidationMessage: string | null;
          extensionsValid: boolean;
          extendsionValidationMessages: string[];
          everythingIsValid: boolean;
        }
      | undefined = this.browsedFiles.get(props.id);

    let toUpdate:
      | {
          name: string;
          required: boolean;
          requiredMessage: string | null;
          files: File[];
          isMultiple: boolean;
          hasFiles: boolean;
          sizeValid: boolean;
          sizeValidationMessage: string | null;
          extensionsValid: boolean;
          extendsionValidationMessages: string[];
          everythingIsValid: boolean;
        }
      | undefined = undefined;

    if (!current) {
      toUpdate = this.browsedFiles.get(props.id);
    } else {
      toUpdate = current;
    }

    if (!toUpdate) return;

    if (props.isMultiple) {
      const files = event.target.files;

      toUpdate.files = files.length > 0 ? [...files] : [];
      toUpdate.hasFiles = toUpdate.files.length > 0;
    } else {
      const file = event.target.files.length > 0 ? event.target.files[0] : null;

      if (file) {
        toUpdate.files = [];
        toUpdate.files.push(file);
      }

      toUpdate.hasFiles = toUpdate.files.length > 0;
    }

    if (props.isHidden || props.isReadOnly) {
      toUpdate.required = false;
    } else {
      toUpdate.required = props.isRequired;
    }

    if (props.sizeValidation) {
      if (props.isMultiple) {
        const files = event.target.files;

        for (const file of files) {
          const isValid: boolean = this.checkFileSize(
            file,
            props.sizeValidation.size
          );

          if (!isValid) {
            toUpdate.sizeValid = false;
            break;
          }

          toUpdate.sizeValid = true;
        }
      } else {
        const file = event.target.files[0];

        if (file) {
          const isValid: boolean = this.checkFileSize(
            file,
            props.sizeValidation.size
          );

          toUpdate.sizeValid = isValid;
        }
      }
    }

    if (props.extensionValidations && props.extensionValidations.length > 0) {
      if (props.isMultiple) {
        const files = event.target.files;
        toUpdate.extendsionValidationMessages = [];

        for (const file of files) {
          for (const exntensionValidation of props.extensionValidations) {
            const isValid: boolean = this.checkFileExtension(
              file,
              exntensionValidation.extension
            );

            if (!isValid) {
              toUpdate.extensionsValid = false;
              toUpdate.extendsionValidationMessages.push(
                exntensionValidation.message
              );
              break;
            }

            toUpdate.extensionsValid = true;
          }

          if (!toUpdate.extensionsValid) {
            break;
          }
        }
      } else {
        const file = event.target.files[0];
        toUpdate.extendsionValidationMessages = [];

        if (file) {
          for (const exntensionValidation of props.extensionValidations) {
            const isValid: boolean = this.checkFileExtension(
              file,
              exntensionValidation.extension
            );

            if (!isValid) {
              toUpdate.extensionsValid = false;
              toUpdate.extendsionValidationMessages.push(
                exntensionValidation.message
              );

              break;
            }

            toUpdate.extensionsValid = true;
          }
        }
      }
    }

    let everythingIsFine: boolean = true;

    if (props.isHidden || props.isReadOnly) {
      everythingIsFine = true;
    } else {
      everythingIsFine =
        (props.isRequired ? toUpdate.hasFiles : true) &&
        toUpdate.sizeValid &&
        toUpdate.extensionsValid;
    }

    toUpdate.everythingIsValid = everythingIsFine;

    this.browsedFiles.set(props.id, toUpdate);
  }

  private checkFileSize(file: any, sizeToCompare: number): boolean {
    const sizeInMB: number = file.size / (1024 * 1024);
    return sizeInMB <= sizeToCompare;
  }

  private checkFileExtension(file: any, extensionToCompare: string): boolean {
    const extension: string = file.name.split('.').pop()?.toLowerCase();

    return extension === extensionToCompare;
  }

  private appendSelectBox(selectBox: INgImFormSelectBoxModel): void {
    let validators: ValidatorFn[] = [];

    if (!selectBox.isReadOnly && !selectBox.isHidden) {
      if (selectBox.isRequired) {
        validators.push(Validators.required);
      }
    }

    let selected: string[] = [];

    if (selectBox.options) {
      if (selectBox.isMultiple) {
        selected = selectBox.options
          .filter((value) => value.selected)
          .map((value) => value.value);

        this.form.addControl(
          selectBox.name,
          new FormControl(
            { value: selected, disabled: selectBox.isReadOnly },
            validators
          )
        );
      } else {
        selected = selected = selectBox.options
          .filter((value) => value.selected)
          .map((value) => value.value);

        if (selected.length > 0) {
          this.form.addControl(
            selectBox.name,
            new FormControl(
              { value: selected[0], disabled: selectBox.isReadOnly },
              validators
            )
          );
        }
      }
    }

    this.form.addControl(
      selectBox.name,
      new FormControl({ value: '', disabled: selectBox.isReadOnly }, validators)
    );
  }

  private appendCheckbox(checkbox: INgImFormCheckBoxModel): void {
    let validators: ValidatorFn[] = [];

    if (!checkbox.isReadOnly && !checkbox.isHidden) {
      if (checkbox.isRequired) {
        validators.push(Validators.requiredTrue);
      }
    }

    if (checkbox.checked) {
      this.form.addControl(
        checkbox.name,
        new FormControl(
          { value: true, disabled: checkbox.isReadOnly },
          validators
        )
      );
    } else {
      this.form.addControl(
        checkbox.name,
        new FormControl(
          { value: false, disabled: checkbox.isReadOnly },
          validators
        )
      );
    }
  }

  private appendRadioButtonGroup(
    radioButtonGroup: INgImFormRadioButtonGroupModel
  ): void {
    let validators: ValidatorFn[] = [];

    if (!radioButtonGroup.isReadOnly && !radioButtonGroup.isHidden) {
      if (radioButtonGroup.isRequired) {
        validators.push(Validators.required);
      }
    }

    if (!radioButtonGroup.radioButtons) {
      this.form.addControl(
        radioButtonGroup.name,
        new FormControl(
          { value: null, disabled: radioButtonGroup.isReadOnly },
          validators
        )
      );
      return;
    }

    let selectedRadioButton:
      | { checked: boolean; value: string; text: string }
      | undefined = radioButtonGroup.radioButtons.find(
      (value) => value.checked
    );

    if (!selectedRadioButton) {
      this.form.addControl(
        radioButtonGroup.name,
        new FormControl(
          { value: null, disabled: radioButtonGroup.isReadOnly },
          validators
        )
      );
      return;
    }

    this.form.addControl(
      radioButtonGroup.name,
      new FormControl(
        {
          value: selectedRadioButton.value,
          disabled: radioButtonGroup.isReadOnly,
        },
        validators
      )
    );
  }
}
