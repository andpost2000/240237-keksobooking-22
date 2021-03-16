import { MAP_CENTER, setFormChildrenState } from './util.js';
import { getData } from './api.js';
import { createCard } from './render.js';

const mapFilters = document.querySelector('.map__filters');
const form = document.querySelector('.ad-form');
const address = form.querySelector('#address');


const onLoad = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  address.value = `${MAP_CENTER.lat.toFixed(3)}, ${MAP_CENTER.lng.toFixed(3)}`;
  setFormChildrenState(mapFilters, false);
  setFormChildrenState(form, false);
};

/* global L:readonly */
export const mymap = L.map('map-canvas').on('load', onLoad).setView(MAP_CENTER, 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcG9zdDIwMDAiLCJhIjoiY2tsbW8wMzIwMDAyaDJvbW50ODAxejZ2ciJ9.wMqFqT2J3hPnWO_UaoH0Xw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'your.mapbox.access.token',
}).addTo(mymap);

const mainPinIcon = L.icon(
  {
    iconUrl: '/img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const mainPinMarker = L.marker(
  MAP_CENTER,
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(mymap);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(3)}, ${evt.target.getLatLng().lng.toFixed(3)}`;
});

const getDataAndRenderMarker = getData(
  (data) => {
    data.forEach((item) => {
      const { lat, lng } = item.location;
      const icon = L.icon({
        iconUrl: '/img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );
      marker
        .addTo(mymap)
        .bindPopup(
          createCard(item),
          {
            keepInView: true,
          },
        );
    });
  },
  (err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  },
);

getDataAndRenderMarker();
