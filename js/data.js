import {
  getRandomFloatingPointNumber,
  getRandomPositiveInteger,
  getRandomCountArray
} from './util.js';


const SETTINGS = {
  arrayLength: 10,
  avatars: { min: 1, max: 8 },
  price: { min: 0, max: 50000 },
  rooms: { min: 1, max: 7 },
  title: 'Отличное предложение!',
  guests: { min: 1, max: 10 },
  description: 'Хорошее местоположение, новая мебель',
  location: {
    x: {
      min: 35.6500,
      max: 35.7000,
    },
    y: {
      min: 139.70000,
      max: 139.80000,
    },
    toFixLength: 5,
  },
};
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_URLS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createItem = () => {

  const location = {
    x: getRandomFloatingPointNumber(SETTINGS.location.x.min, SETTINGS.location.x.max, SETTINGS.location.toFixLength),
    y: getRandomFloatingPointNumber(SETTINGS.location.y.min, SETTINGS.location.y.max, SETTINGS.location.toFixLength),
  };

  return {
    author: {
      avatar: `img/avatars/user0${getRandomPositiveInteger(SETTINGS.avatars.min, SETTINGS.avatars.max)}.png`,
    },
    offer: {
      title: SETTINGS.title,
      address: `${location.x}, ${location.y}`,
      price: getRandomPositiveInteger(SETTINGS.price.min, SETTINGS.price.max),
      type: OFFER_TYPE[getRandomPositiveInteger(0, OFFER_TYPE.length - 1)],
      rooms: getRandomPositiveInteger(SETTINGS.rooms.min, SETTINGS.rooms.max),
      guests: getRandomPositiveInteger(SETTINGS.guests.min, SETTINGS.rooms.max),
      checkIn: TIME[getRandomPositiveInteger(0, TIME.length - 1)],
      checkOut: TIME[getRandomPositiveInteger(0, TIME.length - 1)],
      features: getRandomCountArray(FEATURES),
      description: SETTINGS.description,
      photos: getRandomCountArray(PHOTO_URLS),
    },
    location,
  };
};

const createData = () => new Array(SETTINGS.arrayLength).fill(null).map(() => createItem());
const data = createData();

export { data };
