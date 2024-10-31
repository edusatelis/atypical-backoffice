import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as leaflet from 'leaflet';
import 'leaflet.markercluster';
import { DemandMapInfoComponent } from '../demands-control/demand-map-info/demand-map-info.component';

@Component({
  selector: 'app-map-demand',
  templateUrl: './map-demand.component.html',
  styleUrls: ['./map-demand.component.scss']
})
export class MapDemandComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() response: any[] = [];
  private map!: leaflet.Map;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    console.log(this.response);
    
  }

  ngOnDestroy() {
    this.map.remove();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['response'] && this.map) {
      this.updateMap();
    }
  }

  private initMap(): void {
    if (this.response.length === 0) {
      return;
    }
    console.log(this.response[0].latitude);
    
    this.map = leaflet.map('map', {
      center: [this.response[0].latitude, this.response[0].longitude],
      zoom: 13,
    });

    const tiles = leaflet.tileLayer(
      'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor',
      }
    );

    tiles.addTo(this.map);

    this.updateMap();
  }

  private updateMap(): void {
    if (this.response.length === 0) {
      return;
    }
  
    this.map.eachLayer((layer) => {
      if ((layer as any).options && (layer as any).options.pane === 'markerPane') {
        this.map.removeLayer(layer);
      }
    });
  
    const markers = leaflet.markerClusterGroup();
    const bounds = leaflet.latLngBounds([]);
  
    this.response.forEach((address) => {
      const marker = leaflet
        .marker([address.latitude, address.longitude])
        .addTo(this.map);
  
      markers.addLayer(marker); 
      bounds.extend(marker.getLatLng());
      marker.on('click', () => {
        const modalRef = this.modalService.open(DemandMapInfoComponent, {centered: true});
        modalRef.componentInstance.response = address;
      });
    });
  
    this.map.addLayer(markers);
    this.map.fitBounds(bounds);
  }
  
}
