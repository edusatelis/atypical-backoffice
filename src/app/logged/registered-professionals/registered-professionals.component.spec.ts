import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredProfessionalsComponent } from './registered-professionals.component';

describe('RegisteredProfessionalsComponent', () => {
  let component: RegisteredProfessionalsComponent;
  let fixture: ComponentFixture<RegisteredProfessionalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredProfessionalsComponent]
    });
    fixture = TestBed.createComponent(RegisteredProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
