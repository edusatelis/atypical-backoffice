import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() response: any[] = [];
  private map!: leaflet.Map;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.map.remove();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['addresses'] && this.map) {
      this.updateMap();
    }
  }

  private initMap(): void {
    if (this.response.length === 0) {
      return;
    }
    console.log(this.response[0].user.address.latitude);
    
    this.map = leaflet.map('map', {
      center: [this.response[0].user.address.latitude, this.response[0].user.address.longitude],
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

    const bounds = leaflet.latLngBounds([]);

    this.response.forEach((address) => {
      const customIcon = leaflet.divIcon({
        html: `<div class="custom-icon" style="background-image: url('${address.user.profilePicture}');"></div>`,
        className: 'dummy', 
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      });
      const marker = leaflet
        .marker([address.user.address.latitude, address.user.address.longitude], {icon: customIcon})
        .addTo(this.map);
        bounds.extend(marker.getLatLng());
        marker.on('click', () => {
          this.router.navigate(['/logged/professional-detail', address.id]);
        });
    });
    this.map.fitBounds(bounds);
  }
}