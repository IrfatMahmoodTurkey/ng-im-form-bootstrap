import { TestBed } from '@angular/core/testing';

import { NgImFormService } from './ng-im-form.service';

describe('NgImFormService', () => {
  let service: NgImFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgImFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
