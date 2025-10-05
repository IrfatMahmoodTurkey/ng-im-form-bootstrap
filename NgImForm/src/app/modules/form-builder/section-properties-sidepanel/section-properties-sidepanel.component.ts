import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHorizonatalFormSectionModel } from '../../../models/horizontal-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-section-properties-sidepanel',
  templateUrl: './section-properties-sidepanel.component.html',
})
export class SectionPropertiesSidepanelComponent implements OnInit {
  @Input() sectionProperties: IHorizonatalFormSectionModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();

  form: FormGroup = new FormGroup({});

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

    if (this.sectionProperties) {
      const {
        title,
        subTitle,
        class: className,
        headerClass,
        bodyClass,
      } = this.sectionProperties;

      this.form.controls['title'].setValue(title);
      this.form.controls['subTitle'].setValue(subTitle);
      this.form.controls['class'].setValue(className);
      this.form.controls['headerClass'].setValue(headerClass);
      this.form.controls['bodyClass'].setValue(bodyClass);
    }
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }
}
