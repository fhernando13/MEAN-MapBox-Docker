import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as Mapboxgl from 'mapbox-gl';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Mapboxgl.Map | any;
  token = environment.mapTokenKey;
  style = 'mapbox://styles/mapbox/dark-v11';
  long = -101.682136;
  lat = 21.122871;
  zoom = 12
  latlong = 0
  
  constructor() { 
    
  }

  myMap() {
    (Mapboxgl as any).accessToken = this.token,
      this.map = new Mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.long, this.lat],
      zoom: this.zoom
    });
    this.marketOnMap(this.long, this.lat);
    this.map.addControl(new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken
    }));
    this.map.addControl(new Mapboxgl.NavigationControl);
    this.map.addControl(new Mapboxgl.FullscreenControl());
    this.map.addControl(new Mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
  }))
    
  }

  marketOnMap(long: number, lat:number){
    const marker = new Mapboxgl.Marker({
    draggable: true,
  }).setLngLat([long, lat]).addTo(this.map)
    marker.on('dragend',()=>{
      console.log(marker.getLngLat()
      )});
  }

  getLatLong(long: number, lat:number){
    const marker = new Mapboxgl.Marker({
    draggable: true,
  }).setLngLat([long, lat]).addTo(this.map)
    marker.on('dragend',()=>{
      console.log(marker.getLngLat()
      )});
  }

  
}