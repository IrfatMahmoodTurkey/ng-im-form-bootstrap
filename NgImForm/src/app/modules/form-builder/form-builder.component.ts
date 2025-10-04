import { Component, OnInit } from '@angular/core';
import {
  IHorizonatalFormSectionModel,
  IHorizontalFormModel,
} from '../../models/horizontal-form.model';
import { APIMethodsEnum } from '../../enums/api-methods.enum';
import { SendBodyTypesEnum } from '../../enums/send-body-types.enum';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  horizontalForm: IHorizontalFormModel = {
    checkValidations: true,
    isResetButtonAvailable: true,
    submitAPIUrl: '',
    method: APIMethodsEnum.POST,
    sendBodyAs: SendBodyTypesEnum.JSON,
    authorization: {
      willAuthorize: false,
      bearerTokenStorageKey: '',
    },
    responseMessages: {
      onSuccess: 'Success',
      onFailed: 'Failed',
    },
    sections: [],
  };

  isFieldSelectionSidePanelOpen: boolean = false;

  constructor() {}

  ngOnInit() {}

  addSection(): void {
    const generatedId: string = String(Date.now());

    this.horizontalForm.sections.push({
      id: generatedId,
      title: 'Section Title',
      subTitle: 'Section Subtitle',
      class: 'section-class',
      headerClass: 'section-header-class',
      bodyClass: 'section-body-class',
      elements: [],
    });
  }

  removeSection(id: string): void {
    if (this.horizontalForm.sections.length <= 0) {
      return;
    }

    const indexOf: number = this.horizontalForm.sections.findIndex(
      (value: IHorizonatalFormSectionModel) => value.id === id
    );

    if (indexOf < 0) {
      return;
    }

    this.horizontalForm.sections.splice(indexOf, 1);
  }

  viewFieldSelectionSidePanel(): void {
    this.isFieldSelectionSidePanelOpen = true;
  }

  hideFieldSelectionSidePanel(): void {
    this.isFieldSelectionSidePanelOpen = false;
  }
}
