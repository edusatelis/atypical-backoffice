import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterViewerComponent } from './register-viewer.component';

describe('RegisterViewerComponent', () => {
  let component: RegisterViewerComponent;
  let fixture: ComponentFixture<RegisterViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterViewerComponent]
    });
    fixture = TestBed.createComponent(RegisterViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
