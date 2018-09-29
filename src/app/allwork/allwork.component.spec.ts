import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllworkComponent } from './allwork.component';

describe('AllworkComponent', () => {
  let component: AllworkComponent;
  let fixture: ComponentFixture<AllworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
