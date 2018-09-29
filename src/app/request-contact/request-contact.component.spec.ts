import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestContactComponent } from './request-contact.component';

describe('RequestContactComponent', () => {
  let component: RequestContactComponent;
  let fixture: ComponentFixture<RequestContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
