import { setFormChildrenState } from './form.js';
const mapFilters = document.querySelector('.map__filters');

let L = null;
if (window.L) {
  L = window.L;
}
const onLoad = () => {
  console.log('========onLoadMap=======')
  setFormChildrenState(mapFilters, false);
};

export const mymap = L.map('map-canvas').on('load', onLoad).setView([35.683, 139.749], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcG9zdDIwMDAiLCJhIjoiY2tsbW8wMzIwMDAyaDJvbW50ODAxejZ2ciJ9.wMqFqT2J3hPnWO_UaoH0Xw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'your.mapbox.access.token',
}).addTo(mymap);
const mainPin = L.icon({
  iconUrl: '/img/main-pin.svg',

  iconSize: [40, 80], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

L.marker([35.683, 139.749], { icon: mainPin }).addTo(mymap);
const popup = L.popup();
const onMapClick = (e) => {
  popup
    .setLatLng(e.latlng)
    .setContent('You clicked the map at ' + e.latlng.toString())
    .openOn(mymap);
}

mymap.on('click', onMapClick);
