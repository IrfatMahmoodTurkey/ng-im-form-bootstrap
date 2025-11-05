import { Component, OnInit } from '@angular/core';
import { INgImHorizontalFormModel } from '../../models/horizontal-form.model';

@Component({
  selector: 'app-form-builder-page',
  templateUrl: './form-builder-page.component.html',
})
export class FormBuilderPageComponent implements OnInit {
  builtForm: INgImHorizontalFormModel | undefined | null;

  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  storeNewForm(form: INgImHorizontalFormModel): void {
    localStorage.setItem('form', JSON.stringify(form));
  }

  initializeForm(): void {
    const form: string | undefined | null = localStorage.getItem('form');

    if (!form) return;

    this.builtForm = JSON.parse(form);
  }

  clearForm(): void {
    localStorage.clear();
  }
}
