export const getRandomPositiveInteger = (min, max) => {
  if (min > max) {
    return min;
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomFloatingPointNumber = (min, max, digitsAfterDot) => {
  if (digitsAfterDot) {
    const auxiliaryNumber = 10 * digitsAfterDot;
    const minInteger = min * auxiliaryNumber;
    const maxInteger = max * auxiliaryNumber;
    return (getRandomPositiveInteger(minInteger, maxInteger) / auxiliaryNumber).toFixed(digitsAfterDot);
  }

  return getRandomPositiveInteger(min, max);
};

export const makeUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  const getUniqueRandomInteger = () => {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
    }
    if (previousValues.includes(currentValue)) {
      return getUniqueRandomInteger();
    }
    previousValues.push(currentValue);
    return currentValue;
  };

  return getUniqueRandomInteger;
};

export const getRandomCountArray = (array) => {
  const max = array.length - 1;
  const count = getRandomPositiveInteger(0, max);
  const getUniqueRandomInteger = makeUniqueRandomIntegerGenerator(0, max);
  const result = [];

  for (let i = 0; i < count; i++) {
    const uiniqueIndex = getUniqueRandomInteger();
    result.push(array[uiniqueIndex]);
  }

  return result;
};
