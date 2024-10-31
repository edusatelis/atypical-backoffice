import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractControlComponent } from './search-control.component';

describe('ContractControlComponent', () => {
  let component: ContractControlComponent;
  let fixture: ComponentFixture<ContractControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractControlComponent]
    });
    fixture = TestBed.createComponent(ContractControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
