import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDemandComponent } from './map-demand.component';

describe('MapDemandComponent', () => {
  let component: MapDemandComponent;
  let fixture: ComponentFixture<MapDemandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapDemandComponent]
    });
    fixture = TestBed.createComponent(MapDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
