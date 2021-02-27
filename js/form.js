// import { mymap }  from './map.js';

const form = document.querySelector('.ad-form');
const fieldType = form.querySelector('#type');
const fieldPrice = form.querySelector('#price');
const fieldTimeIn = form.querySelector('#timein');
const fieldTimeOut = form.querySelector('#timeout');
const mapFilters = document.querySelector('.map__filters');

export const setFormChildrenState = (form, disabled = true) => {
  console.log('========set=========', disabled);
  [...form.children].forEach(item => item.disabled = disabled);
}

document.addEventListener('DOMContentLoaded', () => {
  if (form) {
    form.classList.add('ad-form--disabled');
    setFormChildrenState(form);
  }

  if (mapFilters) {
    mapFilters.classList.add('map__filters-container--disabled');
    setFormChildrenState(mapFilters);
    // setTimeout(() => setFormChildrenState(mapFilters, false), 2000);
  }
});

const onFieldType = (elem) => {
  const minPrice = {bungalow: '0', flat: '1000', house: '5000', palace: '10000'};
  fieldPrice.placeholder = minPrice[elem.value];
}

const onFieldTimeIn = (elem) => {
  const selectedOptionIndex = elem.selectedIndex;
  fieldTimeOut.selectedIndex = selectedOptionIndex;
}

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
    case fieldTimeOut:
      onFieldTimeOut(target);
      break;
    default:
      break;
  }
}

form.addEventListener('change', changeForm);
