'use strict'

const getRandomPositiveInteger = (min, max) => {
  if (min > max) {
    return min;
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const getRandomFloatingPointNumber = (min, max, digitsAfterDot) => {
  if (digitsAfterDot) {
    const auxiliaryNumber = 10 * digitsAfterDot;
    const minInteger = min * auxiliaryNumber;
    const maxInteger = max * auxiliaryNumber;
    return (getRandomPositiveInteger(minInteger, maxInteger) / auxiliaryNumber).toFixed(digitsAfterDot);
  }

  return getRandomPositiveInteger(min, max);
}
