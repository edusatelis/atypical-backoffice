import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsControlComponent } from './demands-control.component';

describe('DemandsControlComponent', () => {
  let component: DemandsControlComponent;
  let fixture: ComponentFixture<DemandsControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandsControlComponent]
    });
    fixture = TestBed.createComponent(DemandsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
