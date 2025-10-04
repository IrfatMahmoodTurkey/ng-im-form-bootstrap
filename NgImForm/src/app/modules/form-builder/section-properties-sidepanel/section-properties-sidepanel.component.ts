import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHorizonatalFormSectionModel } from '../../../models/horizontal-form.model';

@Component({
  selector: 'app-section-properties-sidepanel',
  templateUrl: './section-properties-sidepanel.component.html',
})
export class SectionPropertiesSidepanelComponent implements OnInit {
  @Input() sectionProperties: IHorizonatalFormSectionModel | undefined;

  @Output() hidePanelEvent: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (!this.sectionProperties) this.hide();
  }

  hide(): void {
    this.hidePanelEvent.emit();
  }
}
