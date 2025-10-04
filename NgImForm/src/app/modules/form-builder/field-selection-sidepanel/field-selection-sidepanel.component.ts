import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-field-selection-sidepanel',
  templateUrl: './field-selection-sidepanel.component.html',
})
export class FieldSelectionSidePanelComponent implements OnInit {
  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();

  fields: string[] = [
    'Textbox',
    'Textarea',
    'File Upload',
    'Dropdown Select Box',
    'Check Box',
    'Radio Button',
    'Radio Button Group',
    'Image View Box',
  ];

  constructor() {}

  ngOnInit() {}

  hide(): void {
    this.hidePanelEvent.emit();
  }
}
