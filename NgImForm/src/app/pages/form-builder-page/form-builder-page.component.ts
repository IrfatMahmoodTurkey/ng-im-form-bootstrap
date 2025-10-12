import { Component, OnInit } from '@angular/core';
import { IHorizontalFormModel } from '../../models/horizontal-form.model';

@Component({
  selector: 'app-form-builder-page',
  templateUrl: './form-builder-page.component.html',
})
export class FormBuilderPageComponent implements OnInit {
  builtForm: IHorizontalFormModel | undefined | null;

  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  storeNewForm(form: IHorizontalFormModel): void {
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
