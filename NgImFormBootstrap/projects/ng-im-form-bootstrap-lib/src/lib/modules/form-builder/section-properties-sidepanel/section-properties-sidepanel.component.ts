import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISectionPropertiesInputEmitModel } from '../../../models/section-properties-input-emit.model';

@Component({
  selector: 'app-section-properties-sidepanel',
  templateUrl: './section-properties-sidepanel.component.html',
})
export class SectionPropertiesSidepanelComponent implements OnInit {
  @Input() sectionProperties: ISectionPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<ISectionPropertiesInputEmitModel> =
    new EventEmitter();

  form: FormGroup = new FormGroup({});
  isSubmitClicked: boolean = false;

  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form.addControl('title', new FormControl('', [Validators.required]));
    this.form.addControl('subTitle', new FormControl(''));
    this.form.addControl('class', new FormControl(''));
    this.form.addControl('headerClass', new FormControl(''));
    this.form.addControl('bodyClass', new FormControl(''));

    if (!this.sectionProperties) {
      return;
    }

    const {
      title,
      subTitle,
      class: className,
      headerClass,
      bodyClass,
    } = this.sectionProperties.properties;

    this.form.controls['title'].setValue(title);
    this.form.controls['subTitle'].setValue(subTitle);
    this.form.controls['class'].setValue(className);
    this.form.controls['headerClass'].setValue(headerClass);
    this.form.controls['bodyClass'].setValue(bodyClass);
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid) {
      return;
    }

    if (!this.sectionProperties) {
      return;
    }

    const [title, subTitle, className, headerClass, bodyClass] = [
      this.form.controls['title'].value,
      this.form.controls['subTitle'].value,
      this.form.controls['class'].value,
      this.form.controls['headerClass'].value,
      this.form.controls['bodyClass'].value,
    ];

    this.saveChangesEvent.emit({
      sectionId: this.sectionProperties.sectionId,
      properties: {
        id: this.sectionProperties.properties.id,
        title,
        subTitle,
        class: className,
        headerClass,
        bodyClass,
        elements: this.sectionProperties.properties.elements,
      },
    });

    this.hide();
  }
}
