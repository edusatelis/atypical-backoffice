import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotingAgentComponent } from './promoting-agent.component';

describe('PromotingAgentComponent', () => {
  let component: PromotingAgentComponent;
  let fixture: ComponentFixture<PromotingAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotingAgentComponent]
    });
    fixture = TestBed.createComponent(PromotingAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
