import { MAP_CENTER_COORDS, setFormChildrenState, setFieldCapacityOptionsState } from './util.js';
import { createCard } from './render.js';

const RENDER_PIN_COUNT = 10;
const MAIN_ZOOM = 10;
const mapFilters = document.querySelector('.map__filters');
const roomsField = mapFilters.querySelector('#housing-rooms');
const typeField = mapFilters.querySelector('#housing-type');
const priceField = mapFilters.querySelector('#housing-price');
const guestsField = mapFilters.querySelector('#housing-guests');
const form = document.querySelector('.ad-form');
const address = form.querySelector('#address');
const fieldRoomNumber = form.querySelector('#room_number');
const fieldCapacity = form.querySelector('#capacity');

const onMapLoad = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  address.value = `${MAP_CENTER_COORDS.lat.toFixed(3)}, ${MAP_CENTER_COORDS.lng.toFixed(3)}`;
  setFormChildrenState(mapFilters, false);
  setFormChildrenState(form, false);
  setFieldCapacityOptionsState(fieldCapacity, fieldRoomNumber.value);
};

const mainPinIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const mainPinMarker = L.marker(
  MAP_CENTER_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const resetMainMarker = () => {
  mainPinMarker.setLatLng(MAP_CENTER_COORDS);
  mymap.setView(MAP_CENTER_COORDS, MAIN_ZOOM);
};

/* global L:readonly */
const mymap = L.map('map-canvas').setView(MAP_CENTER_COORDS, MAIN_ZOOM);

const filterPins = (data, evt) => {
  const priceRange = {
    low: {
      min: 0,
      max: 9999,
    },
    middle: {
      min: 10000,
      max: 49999,
    },
    high: {
      min: 50000,
      max: 1000000,
    },
  };
  let filteredData = data.slice();
  const checkedFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  if (evt) {
    if (typeField.value !== 'any') {
      filteredData = filteredData.filter(item => item.offer.type === typeField.value);
    }
    if (priceField.value !== 'any') {
      filteredData = filteredData.filter(item => (item.offer.price >= priceRange[priceField.value].min && item.offer.price <= priceRange[priceField.value].max));
    }
    if (roomsField.value !== 'any') {
      filteredData = filteredData.filter(item => item.offer.rooms === Number(roomsField.value));
    }
    if (guestsField.value !== 'any') {
      filteredData = filteredData.filter(item => item.offer.guests === Number(guestsField.value));
    }
    if (checkedFeatures.length) {
      filteredData = filteredData.filter(
        item => [...checkedFeatures].every(feature => item.offer.features.includes(feature.value)));
    }
  }
  return filteredData;
};

const pins = [];

const renderMarker = (data, evt) => {
  pins.forEach((pin) => pin.remove());

  filterPins(data, evt)
    .slice(0, RENDER_PIN_COUNT)
    .forEach((item) => {
      const { lat, lng } = item.location;
      const icon = L.icon({
        iconUrl: 'img/pin.svg',
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

      pins.push(marker);
    });

  if (!evt) {
    onMapLoad();
  }
};

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcG9zdDIwMDAiLCJhIjoiY2tsbW8wMzIwMDAyaDJvbW50ODAxejZ2ciJ9.wMqFqT2J3hPnWO_UaoH0Xw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'your.mapbox.access.token',
}).addTo(mymap);

mainPinMarker.addTo(mymap);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(3)}, ${evt.target.getLatLng().lng.toFixed(3)}`;
});

export { renderMarker, resetMainMarker };
