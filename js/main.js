/* global _:readonly */

import { onFilter, resetFilter } from './form.js';
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
    resetFilter(
      () => renderMarker(data),
    );
  },
  (err) => {
    throw new Error(err);
  },
);
