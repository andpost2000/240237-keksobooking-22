export const createElement = (tag) => {
  return document.createElement(tag);
};

export const minMaxLengthValidate = (target, min, max) => {
  const valueLength = target.value.length;
  if (valueLength < min) {
    target.setCustomValidity('Ещё ' + (min - valueLength) +' симв.');
  } else if (valueLength > max) {
    target.setCustomValidity('Удалите лишние ' + (valueLength - max) +' симв.');
  } else {
    target.setCustomValidity('');
  }
  target.reportValidity();
};

export const setFormChildrenState = (form, disabled) => {
  [...form.children].forEach(item => item.disabled = disabled);
};

export const setFieldCapacityOptionsState = (fieldCapacityElement, roomNumber) => {
  const roomForGuestsMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  }
  Array.from(fieldCapacityElement.options)
    .forEach(option => option.disabled = !roomForGuestsMap[roomNumber].includes(option.value));
  fieldCapacityElement.value = Number(roomNumber) > 3 ? '0' : roomNumber;
};

export const MAP_CENTER_COORDS = { lat: 35.683, lng: 139.749 };
