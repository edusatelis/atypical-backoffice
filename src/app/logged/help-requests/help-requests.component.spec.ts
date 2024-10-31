import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestsComponent } from './help-requests.component';

describe('HelpRequestsComponent', () => {
  let component: HelpRequestsComponent;
  let fixture: ComponentFixture<HelpRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpRequestsComponent]
    });
    fixture = TestBed.createComponent(HelpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
