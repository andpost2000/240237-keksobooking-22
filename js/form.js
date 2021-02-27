const form = document.querySelector('.ad-form');
const fieldType = form.querySelector('#type');
const fieldPrice = form.querySelector('#price');
const fieldTimeIn = form.querySelector('#timein');
const fieldTimeOut = form.querySelector('#timeout');
const allFieldset = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters-container');
const mapFiltersAllSelect = mapFilters.querySelectorAll('select');
const mapFiltersAllChecbox = mapFilters.querySelectorAll('.map__checkbox');

window.onload = () => {
  if (form) {
    form.classList.add('ad-form--disabled');
    allFieldset && allFieldset.forEach(field => field.disabled = true);
  }

  if (mapFilters) {
    mapFilters.classList.add('map__filters-container--disabled');
    mapFiltersAllSelect && mapFiltersAllSelect.forEach(select => select.disabled = true);
    mapFiltersAllSelect && mapFiltersAllChecbox.forEach(checkbox => checkbox.disabled = true);
  }
};

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
