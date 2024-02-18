import { Component, ElementRef, ViewChild } from '@angular/core';
import { LatLng, LatLngTuple, Map, map, tileLayer } from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
private readonly DEFAULT_LATUNG: LatLngTuple = [13.75, 21.62]

@ViewChild('map', {static: true})
mapRef! : ElementRef;

map!:Map;
constructor(){}

ngOnInit():void{
  this.intializeMap();
}

intializeMap(){
  if(this.map) return;
  this.map = map(this.mapRef.nativeElement, {
    attributionControl : false
  }).setView(this.DEFAULT_LATUNG, 1);

  tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
}

findMyLocation(){
  
}
}
