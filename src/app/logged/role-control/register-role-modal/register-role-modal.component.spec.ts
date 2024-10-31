import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRoleModalComponent } from './register-role-modal.component';

describe('RegisterRoleModalComponent', () => {
  let component: RegisterRoleModalComponent;
  let fixture: ComponentFixture<RegisterRoleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterRoleModalComponent]
    });
    fixture = TestBed.createComponent(RegisterRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
