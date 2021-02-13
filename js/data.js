import {
  getRandomFloatingPointNumber,
  getRandomPositiveInteger,
  getRandomCountArray
} from './util.js';

const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_URLS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createItem = () => {

  const location = {
    x: getRandomFloatingPointNumber(35.65000, 35.70000, 5),
    y: getRandomFloatingPointNumber(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: `im/avatars/user0${getRandomPositiveInteger(1, 8)}`,
    },
    offer: {
      title: 'Отличное предложение!',
      address: `${location.x}, ${location.y}`,
      price: getRandomPositiveInteger(100, 1000),
      type: OFFER_TYPE[getRandomPositiveInteger(0, OFFER_TYPE.length - 1)],
      rooms: getRandomPositiveInteger(1, 7),
      guests: getRandomPositiveInteger(1, 10),
      checkIn: TIME[getRandomPositiveInteger(0, TIME.length - 1)],
      checkOut: TIME[getRandomPositiveInteger(0, TIME.length - 1)],
      fetures: getRandomCountArray(FEATURES),
      description: 'Хорошее местоположение, новая мебель',
      photos: getRandomCountArray(PHOTO_URLS),
    },
    location,
  };
};

const LIST = new Array(10).fill(null).map(() => createItem());

export default LIST;
