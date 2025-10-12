import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-spinner-disabled-button',
  template: `<button [ngClass]="buttonClass" type="button" disabled>
    <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    <span class="visually-hidden">Loading...</span>
  </button>`,
})
export class SpinnerDisabledButtonComponent implements OnInit {
  @Input() buttonClass: string = 'btn btn-primary';

  constructor() {}

  ngOnInit() {}
}
