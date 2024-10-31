import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsInfoComponent } from './demands-info.component';

describe('DemandsInfoComponent', () => {
  let component: DemandsInfoComponent;
  let fixture: ComponentFixture<DemandsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandsInfoComponent]
    });
    fixture = TestBed.createComponent(DemandsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
