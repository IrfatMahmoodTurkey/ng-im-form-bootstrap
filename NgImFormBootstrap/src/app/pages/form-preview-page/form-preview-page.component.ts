import { Component, OnInit } from '@angular/core';
import { IHorizontalFormModel } from '../../models/horizontal-form.model';

@Component({
  selector: 'app-form-preview-page',
  templateUrl: './form-preview-page.component.html',
  styleUrls: ['./form-preview-page.component.css'],
})
export class FormPreviewPageComponent implements OnInit {
  form: IHorizontalFormModel | undefined | null;

  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    const form: string | undefined | null = localStorage.getItem('form');

    if (!form) return;

    this.form = JSON.parse(form);
  }
}
