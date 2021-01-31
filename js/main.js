'use strict'

const getZeroFromNegativeNumber = (num) => num < 0 ? 0 : num;

const getRandomPositiveInteger = (min, max) => {
  const minValue = getZeroFromNegativeNumber(min);
  const maxValue = getZeroFromNegativeNumber(max);
  if (minValue > maxValue) {
    return minValue;
  }

  let rand = minValue + Math.random() * (maxValue + 1 - minValue);
  return Math.floor(rand);
}

export const getRandomFloatingPointNumber = (min, max, digitsAfterDot) => {
  if (digitsAfterDot) {
    const auxiliaryNumber = 10 * digitsAfterDot;
    const minInteger = min * auxiliaryNumber;
    const maxInteger = max * auxiliaryNumber;
    return (getRandomPositiveInteger(minInteger, maxInteger) / auxiliaryNumber).toFixed(digitsAfterDot);
  }

  return getRandomPositiveInteger(min, max);
}
