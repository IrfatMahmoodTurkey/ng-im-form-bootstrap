import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-field-selection-sidepanel',
  templateUrl: './field-selection-sidepanel.component.html',
})
export class FieldSelectionSidePanelComponent implements OnInit {
  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  hide(): void {
    this.hidePanelEvent.emit();
  }
}
