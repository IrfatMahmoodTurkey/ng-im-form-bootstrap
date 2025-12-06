import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ALIGNMENTS } from '../../../constants/alignments.constant';
import { ITextPropertiesInputEmitModel } from '../../../models/text-properties-input-emit.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INgImFormTextModel } from '../../../models/horizontal-form.model';

@Component({
  selector: 'app-text-properties-sidepanel',
  templateUrl: './text-properties-sidepanel.component.html',
  styleUrl: '../form-builder.component.scss',
})
export class TextPropertiesSidepanelComponent implements OnInit {
  alignments: string[] = ALIGNMENTS;

  @Input() textProperties: ITextPropertiesInputEmitModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveChangesEvent: EventEmitter<ITextPropertiesInputEmitModel> =
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
    this.form.addControl('name', new FormControl('', [Validators.required]));
    this.form.addControl('class', new FormControl(''));
    this.form.addControl('text', new FormControl('', [Validators.required]));
    this.form.addControl('alignment', new FormControl(this.alignments[0]));

    if (!this.textProperties) {
      return;
    }

    const properties: INgImFormTextModel = this.textProperties.properties;

    this.form.controls['name'].setValue(properties.name);
    this.form.controls['class'].setValue(properties.class);
    this.form.controls['text'].setValue(properties.text);
    this.form.controls['alignment'].setValue(properties.alignment);
  }

  saveChanges(): void {
    this.isSubmitClicked = true;

    if (!this.form.valid) {
      return;
    }

    if (!this.textProperties) {
      return;
    }

    const [name, className, text, alignment] = [
      this.form.controls['name'].value,
      this.form.controls['class'].value,
      this.form.controls['text'].value,
      this.form.controls['alignment'].value,
    ];

    this.saveChangesEvent.emit({
      sectionId: this.textProperties.sectionId,
      textId: this.textProperties.textId,
      properties: {
        id: this.textProperties.textId,
        name,
        class: className,
        text,
        alignment,
      },
    });

    this.hide();
  }
}
