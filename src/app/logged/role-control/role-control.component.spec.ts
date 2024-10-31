import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleControlComponent } from './role-control.component';

describe('RoleControlComponent', () => {
  let component: RoleControlComponent;
  let fixture: ComponentFixture<RoleControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleControlComponent]
    });
    fixture = TestBed.createComponent(RoleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
