import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconsistencyControlComponent } from './inconsistency-control.component';

describe('InconsistencyControlComponent', () => {
  let component: InconsistencyControlComponent;
  let fixture: ComponentFixture<InconsistencyControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InconsistencyControlComponent]
    });
    fixture = TestBed.createComponent(InconsistencyControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
