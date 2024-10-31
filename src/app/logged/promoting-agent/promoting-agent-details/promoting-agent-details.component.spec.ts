import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotingAgentDetailsComponent } from './promoting-agent-details.component';

describe('PromotingAgentDetailsComponent', () => {
  let component: PromotingAgentDetailsComponent;
  let fixture: ComponentFixture<PromotingAgentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotingAgentDetailsComponent]
    });
    fixture = TestBed.createComponent(PromotingAgentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
