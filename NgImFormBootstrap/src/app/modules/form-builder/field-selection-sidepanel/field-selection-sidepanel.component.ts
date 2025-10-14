import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FIELDS } from '../../../constants/field-types.constant';

@Component({
  selector: 'app-field-selection-sidepanel',
  templateUrl: './field-selection-sidepanel.component.html',
})
export class FieldSelectionSidePanelComponent implements OnInit {
  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();
  @Output() selectedTypeEvent: EventEmitter<string> = new EventEmitter();

  selectedIndex: number | undefined;

  fields: string[] = FIELDS;

  constructor() {}

  ngOnInit() {}

  hide(): void {
    this.hidePanelEvent.emit();
  }

  select(index: number): void {
    if (this.selectedIndex === undefined) {
      this.selectedIndex = index;
      return;
    }

    if (this.selectedIndex === index) {
      this.selectedIndex = undefined;
      return;
    }

    this.selectedIndex = index;
  }

  add(): void {
    if (this.selectedIndex === undefined) {
      return;
    }

    const type: string = this.fields[this.selectedIndex];
    this.selectedTypeEvent.emit(type);
    this.hide();
  }
}
