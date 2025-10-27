import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgImFormComponent } from './ng-im-form.component';

describe('NgImFormComponent', () => {
  let component: NgImFormComponent;
  let fixture: ComponentFixture<NgImFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgImFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgImFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
