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
    this.form.addControl(
      'order',
      new FormControl(1, [Validators.required, Validators.min(1)])
    );
    this.form.addControl('name', new FormControl('', [Validators.required]));
    this.form.addControl('label', new FormControl('', [Validators.required]));
    this.form.addControl(
      'type',
      new FormControl('text', [Validators.required])
    );
    this.form.addControl('placeholder', new FormControl(''));
    this.form.addControl('class', new FormControl(''));
    this.form.addControl(
      'userDefinedId',
      new FormControl('', [Validators.required])
    );
    this.form.addControl('isReadOnly', new FormControl(false));
    this.form.addControl('isHidden', new FormControl(false));
    this.form.addControl('isRequired', new FormControl(false));
    this.form.addControl('requiredMessage', new FormControl(''));
    this.form.addControl('regex', new FormControl(''));
    this.form.addControl('regexMessage', new FormControl(''));

    if (!this.textboxProperties) {
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
  }
}
