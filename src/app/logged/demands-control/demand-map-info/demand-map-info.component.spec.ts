import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandMapInfoComponent } from './demand-map-info.component';

describe('DemandMapInfoComponent', () => {
  let component: DemandMapInfoComponent;
  let fixture: ComponentFixture<DemandMapInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandMapInfoComponent]
    });
    fixture = TestBed.createComponent(DemandMapInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
