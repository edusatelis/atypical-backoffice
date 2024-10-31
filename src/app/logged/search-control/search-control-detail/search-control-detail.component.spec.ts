import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchControlDetailComponent } from './search-control-detail.component';

describe('SearchControlDetailComponent', () => {
  let component: SearchControlDetailComponent;
  let fixture: ComponentFixture<SearchControlDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchControlDetailComponent]
    });
    fixture = TestBed.createComponent(SearchControlDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
