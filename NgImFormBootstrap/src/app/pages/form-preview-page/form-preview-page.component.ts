import { Component, OnInit } from '@angular/core';
import { INgImHorizontalFormModel } from '../../models/horizontal-form.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ng-im-form-preview-page',
  templateUrl: './form-preview-page.component.html',
  styleUrls: ['./form-preview-page.component.css'],
})
export class FormPreviewPageComponent implements OnInit {
  form: INgImHorizontalFormModel | undefined | null;

  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    const form: string | undefined | null = localStorage.getItem('form');

    if (!form) return;

    this.form = JSON.parse(form);
  }

  onSubmit(object: any): void {
    console.log('On Submit');
    console.log(object);
  }

  onSubmitProcessing(object: any): void {
    console.log('On Submit Processing');
    console.log(object);
  }

  onSubmitSuccess(object: any): void {
    console.log('On Submit Success');
    console.log(object);
  }

  onSubmitError(object: HttpErrorResponse): void {
    console.log('On Submit Error');
    console.log(object);
  }
}
