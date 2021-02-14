import {
  getRandomFloatingPointNumber,
  getRandomPositiveInteger,
  getRandomCountArray
} from './util.js';


const SETTINGS = {
  arrayLength: 10,
  avatars: { min: 1, max: 8 },
  price: { min: 100, max: 1000 },
  rooms: { min: 1, max: 7 },
  title: 'Отличное предложение!',
  guests: { min: 1, max: 10 },
  description: 'Хорошее местоположение, новая мебель',
};
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
      avatar: `im/avatars/user0${getRandomPositiveInteger(SETTINGS.avatars.min, SETTINGS.avatars.max)}`,
    },
    offer: {
      title: 'Отличное предложение!',
      address: `${location.x}, ${location.y}`,
      price: getRandomPositiveInteger(SETTINGS.price.min, SETTINGS.price.max),
      type: OFFER_TYPE[getRandomPositiveInteger(0, OFFER_TYPE.length - 1)],
      rooms: getRandomPositiveInteger(SETTINGS.rooms.min, SETTINGS.rooms.max),
      guests: getRandomPositiveInteger(SETTINGS.guests.min, SETTINGS.rooms.max),
      checkIn: TIME[getRandomPositiveInteger(0, TIME.length - 1)],
      checkOut: TIME[getRandomPositiveInteger(0, TIME.length - 1)],
      fetures: getRandomCountArray(FEATURES),
      description: 'Хорошее местоположение, новая мебель',
      photos: getRandomCountArray(PHOTO_URLS),
    },
    location,
  };
};

const LIST = new Array(SETTINGS.arrayLength).fill(null).map(() => createItem());

export default LIST;
