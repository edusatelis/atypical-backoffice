import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHelpModalComponent } from './message-help-modal.component';

describe('MessageHelpModalComponent', () => {
  let component: MessageHelpModalComponent;
  let fixture: ComponentFixture<MessageHelpModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageHelpModalComponent]
    });
    fixture = TestBed.createComponent(MessageHelpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
