import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconsistencyDetailModalComponent } from './inconsistency-detail-modal.component';

describe('InconsistencyDetailModalComponent', () => {
  let component: InconsistencyDetailModalComponent;
  let fixture: ComponentFixture<InconsistencyDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InconsistencyDetailModalComponent]
    });
    fixture = TestBed.createComponent(InconsistencyDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
