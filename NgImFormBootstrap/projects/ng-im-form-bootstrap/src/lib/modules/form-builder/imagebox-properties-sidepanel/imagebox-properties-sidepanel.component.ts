import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IImageBoxPropertiesInputEmitModel } from '../../../models/image-box-properties-input-emit.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IImageBoxModel } from '../../../models/horizontal-form.model';
import { ALIGNMENTS } from '../../../constants/alignments.constant';

@Component({
  selector: 'app-imagebox-properties-sidepanel',
  templateUrl: './imagebox-properties-sidepanel.component.html',
  styleUrl: '../form-builder.component.scss',
})
export class ImageboxPropertiesSidepanelComponent implements OnInit {
  alignments: string[] = ALIGNMENTS;

  @Input() imageboxProperties: IImageBoxPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<IImageBoxPropertiesInputEmitModel> =
    new EventEmitter();

  form: FormGroup = new FormGroup({});

  isSubmitClicked: boolean = false;

  constructor() {}

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
    this.form.addControl('class', new FormControl(''));
    this.form.addControl(
      'userDefinedId',
      new FormControl('', [Validators.required])
    );
    this.form.addControl('url', new FormControl('', [Validators.required]));
    this.form.addControl('alt', new FormControl(''));
    this.form.addControl(
      'height',
      new FormControl(100, [Validators.required, Validators.min(1)])
    );
    this.form.addControl(
      'width',
      new FormControl(100, [Validators.required, Validators.min(1)])
    );
    this.form.addControl(
      'alignment',
      new FormControl(this.alignments[0], [Validators.required])
    );

    if (!this.imageboxProperties) {
      return;
    }

    const properties: IImageBoxModel = this.imageboxProperties.properties;

    this.form.controls['order'].setValue(properties.order);
    this.form.controls['name'].setValue(properties.name);
    this.form.controls['class'].setValue(properties.class);
    this.form.controls['userDefinedId'].setValue(properties.userDefinedId);
    this.form.controls['url'].setValue(properties.url);
    this.form.controls['alt'].setValue(properties.alt);
    this.form.controls['height'].setValue(properties.height);
    this.form.controls['width'].setValue(properties.width);
    this.form.controls['alignment'].setValue(properties.alignment);
  }

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid) {
      return;
    }

    if (!this.imageboxProperties) {
      return;
    }

    const [
      order,
      name,
      className,
      userDefinedId,
      url,
      alt,
      height,
      width,
      alignment,
    ] = [
      this.form.controls['order'].value,
      this.form.controls['name'].value,
      this.form.controls['class'].value,
      this.form.controls['userDefinedId'].value,
      this.form.controls['url'].value,
      this.form.controls['alt'].value,
      this.form.controls['height'].value,
      this.form.controls['width'].value,
      this.form.controls['alignment'].value,
    ];

    this.saveChangesEvent.emit({
      sectionId: this.imageboxProperties.sectionId,
      imageBoxId: this.imageboxProperties.imageBoxId,
      properties: {
        id: this.imageboxProperties.imageBoxId,
        order: order,
        name,
        class: className,
        userDefinedId,
        url,
        alt,
        height,
        width,
        alignment,
      },
    });

    this.hide();
  }
}
