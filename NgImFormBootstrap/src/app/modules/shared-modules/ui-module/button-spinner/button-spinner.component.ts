import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-spinner',
  template: `<button class="btn btn-primary" type="button" disabled>
    <span
      class="spinner-grow spinner-grow-sm"
      role="status"
      aria-hidden="true"
    ></span>
    Submitting...
  </button>`,
})
export class ButtonSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
