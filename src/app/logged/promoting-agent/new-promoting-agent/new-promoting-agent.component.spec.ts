import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromotingAgentComponent } from './new-promoting-agent.component';

describe('NewPromotingAgentComponent', () => {
  let component: NewPromotingAgentComponent;
  let fixture: ComponentFixture<NewPromotingAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPromotingAgentComponent]
    });
    fixture = TestBed.createComponent(NewPromotingAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
