let form = document.querySelector('.ad-form');
let fieldType = form.querySelector('#type');
let fieldPrice = form.querySelector('#price');
let fieldTimeIn = form.querySelector('#timein');
let fieldTimeOut = form.querySelector('#timeout');

const onFieldType = (elem) => {
  const minPrice = {bungalow: '0', flat: '1000', house: '5000', palace: '10000'};
  fieldPrice.setAttribute('placeholder', minPrice[elem.value]);
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
  switch (evt.target) {
    case fieldType:
      onFieldType(evt.target);
      break;
    case fieldTimeIn:
      onFieldTimeIn(evt.target);
      break;
    case fieldTimeOut:
      onFieldTimeOut(evt.target);
      break;
    default:
      break;
  }
}

form.addEventListener('change', changeForm);
