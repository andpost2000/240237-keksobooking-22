import { resetMainMarker } from './map.js';
import { MAP_CENTER_COORDS, minMaxLengthValidate, setFormChildrenState, setFieldCapacityOptionsState } from './util.js';
import { sendData } from './api.js';
import { showModal } from './modal.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE = { bungalow: '0', flat: '1000', house: '5000', palace: '10000' };
const form = document.querySelector('.ad-form');
const fieldTitle = form.querySelector('#title');
const fieldType = form.querySelector('#type');
const fieldPrice = form.querySelector('#price');
const fieldTimeIn = form.querySelector('#timein');
const fieldTimeOut = form.querySelector('#timeout');
const fieldRoomNumber = form.querySelector('#room_number');
const fieldCapacity = form.querySelector('#capacity');
const mapFilters = document.querySelector('.map__filters');
const address = form.querySelector('#address');
const resetButton = form.querySelector('.ad-form__reset');

const onFieldTypeChange = (elem) => {
  fieldPrice.placeholder = MIN_PRICE[elem.value];
  onFieldPriceInput(fieldPrice);
};

const onFieldTimeInChange = (elem) => {
  const selectedOptionIndex = elem.selectedIndex;
  fieldTimeOut.selectedIndex = selectedOptionIndex;
};

const onFieldRoomNumberChange = (elem) => {
  setFieldCapacityOptionsState(fieldCapacity, elem.value)
};

const onFieldTitleInput = (elem) => {
  minMaxLengthValidate(elem, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
};

const onFieldPriceInput = (elem) => {
  const value = Number(elem.value);
  const minPrice = Number(MIN_PRICE[fieldType.value]);
  if (value > MAX_PRICE) {
    elem.setCustomValidity('Максимальная цена превышена на ' + (value - MAX_PRICE) + ' руб.');
  } else if (value < minPrice) {
    elem.setCustomValidity('Минимальная цена должна быть выше на ' + (minPrice - value) + ' руб.');
  } else {
    elem.setCustomValidity('');
  }
  elem.reportValidity();
};

const onFieldTimeOutChange = (elem) => {
  const selectedOptionIndex = elem.selectedIndex;
  fieldTimeIn.selectedIndex = selectedOptionIndex;
};

const onCreateFormChange = (evt) => {
  const { target } = evt;
  switch (target) {
    case fieldType:
      onFieldTypeChange(target);
      break;
    case fieldTimeIn:
      onFieldTimeInChange(target);
      break;
    case fieldRoomNumber:
      onFieldRoomNumberChange(target);
      break;
    case fieldTimeOut:
      onFieldTimeOutChange(target);
      break;
    default:
      break;
  }
};

const onCreateFormInput = (evt) => {
  const { target } = evt;
  switch (target) {
    case fieldTitle:
      onFieldTitleInput(target);
      break;
    case fieldPrice:
      onFieldPriceInput(target);
      break;
    default:
      break;
  }
};

form.addEventListener('input', onCreateFormInput);

const onCreateFormSubmitSuccess = () => {
  showModal('success');
  form.reset();
  fieldPrice.placeholder = MIN_PRICE[fieldType.value];
  resetMainMarker();
  address.value = `${MAP_CENTER_COORDS.lat.toFixed(3)}, ${MAP_CENTER_COORDS.lng.toFixed(3)}`;
};

const onCreateFormSubmitError = () => {
  showModal('error');
};

const onFilter = (cb) => {
  mapFilters.addEventListener('change', cb);
};

if (form) {
  form.classList.add('ad-form--disabled');
  setFormChildrenState(form, true);
}

if (mapFilters) {
  mapFilters.classList.add('map__filters--disabled');
  setFormChildrenState(mapFilters, true);
}

form.addEventListener('change', onCreateFormChange);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(
    onCreateFormSubmitSuccess,
    onCreateFormSubmitError,
    formData,
  );
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  mapFilters.reset();
  form.reset();
  resetMainMarker();
  address.value = `${MAP_CENTER_COORDS.lat.toFixed(3)}, ${MAP_CENTER_COORDS.lng.toFixed(3)}`;
});

export { onFilter };
