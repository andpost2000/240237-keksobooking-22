import { minMaxLengthValidate, setFormChildrenState } from './util.js';

const form = document.querySelector('.ad-form');
const fieldTitle = form.querySelector('#title');
const fieldType = form.querySelector('#type');
const fieldPrice = form.querySelector('#price');
const fieldTimeIn = form.querySelector('#timein');
const fieldTimeOut = form.querySelector('#timeout');
const fieldRoomNumber = form.querySelector('#room_number');
const fieldCapacity = form.querySelector('#capacity');
const mapFilters = document.querySelector('.map__filters');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE = { bungalow: '0', flat: '1000', house: '5000', palace: '10000' };

if (form) {
  form.classList.add('ad-form--disabled');
  setFormChildrenState(form, true);
}

if (mapFilters) {
  mapFilters.classList.add('map__filters--disabled');
  setFormChildrenState(mapFilters, true);
}

const onFieldType = (elem) => {
  fieldPrice.placeholder = MIN_PRICE[elem.value];
  onFieldPrice(fieldPrice);
}

const onFieldTimeIn = (elem) => {
  const selectedOptionIndex = elem.selectedIndex;
  fieldTimeOut.selectedIndex = selectedOptionIndex;
}

const onFieldRoomNumber = (elem) => {
  if (fieldCapacity.value > elem.value) {
    fieldCapacity.value = elem.value;
  }
};

const onFieldCapacity = (elem) => {
  if (elem.value > fieldRoomNumber.value) {
    elem.value = fieldRoomNumber.value;
    elem.setCustomValidity('Максимально ' + fieldRoomNumber.value);
  } else {
    elem.setCustomValidity('');
  }
  elem.reportValidity();
};

const onFieldTitle = (elem) => {
  minMaxLengthValidate(elem, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
};

const onFieldPrice = (elem) => {
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

const onFieldTimeOut = (elem) => {
  const selectedOptionIndex = elem.selectedIndex;
  fieldTimeIn.selectedIndex = selectedOptionIndex;
}

const changeForm = (evt) => {
  const { target } = evt;
  switch (target) {
    case fieldType:
      onFieldType(target);
      break;
    case fieldTimeIn:
      onFieldTimeIn(target);
      break;
    case fieldTitle:
      onFieldTitle(target);
      break;
    case fieldPrice:
      onFieldPrice(target);
      break;
    case fieldRoomNumber:
      onFieldRoomNumber(target);
      break;
    case fieldCapacity:
      onFieldCapacity(target);
      break;
    case fieldTimeOut:
      onFieldTimeOut(target);
      break;
    default:
      break;
  }
}

form.addEventListener('change', changeForm);
