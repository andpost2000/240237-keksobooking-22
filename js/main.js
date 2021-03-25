/* global _:readonly */

import { onFilter } from './form.js';
import { renderMarker } from './map.js';
import { getData } from './api.js';

const DELAY = 500;

getData(
  (data) => {
    renderMarker(data);
    onFilter(
      _.debounce(
        (evt) => renderMarker(data, evt),
        DELAY,
      ),
    );
  },
  (err) => {
    throw new Error(err);
  },
);
