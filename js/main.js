import { onFilter } from './form.js';
import { renderMarker } from './map.js';
import { getData } from './api.js';

getData(
  (data) => {
    renderMarker(data);
    onFilter((evt) => renderMarker(data, evt));
  },
  (err) => {
    throw new Error(err);
  },
);
