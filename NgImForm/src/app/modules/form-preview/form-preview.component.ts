import { Component, Input, OnInit } from '@angular/core';
import {
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
} from '../../models/horizontal-form.model';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css'],
})
export class FormPreviewComponent implements OnInit {
  @Input() form: IHorizontalFormModel | null | undefined;

  sections: IHorizonatalFormSectionModel[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.form) {
      console.error('Must need a form object to initialze the form!');
      return;
    }

    this.sections = this.form.sections;
  }
}
