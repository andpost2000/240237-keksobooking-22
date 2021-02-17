import { createData } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const TYPE_RU = [{id: 'flat', name: 'Квартира '}, {id: 'bungalow', name: 'Бунгало'}, {id: 'house', name: 'Дом'}, {id: 'palace', name: 'Дворец'}];
const createType = (type, dictionary) => {
  return dictionary.find(item => item.id === type).name;
}
const filterFeatures = (cardElement, offer) => {
  const features = cardElement.querySelector('.popup__features');
  const featuresItems = features.querySelectorAll('.popup__feature');
  featuresItems.forEach(li => {
    offer.features.some(feature => li.className.includes(`-${feature}`))
      ? true
      : li.remove();
  })
};
const createPhoto = (cardElement, offer) => {
  const photos = cardElement.querySelector('.popup__photos');
  const fragment = document.createDocumentFragment();
  offer.photos.forEach(photoUrl => {
    const photo = photos.querySelector('.popup__photo').cloneNode(true);
    photo.src = photoUrl;
    fragment.append(photo);
  });
  photos.querySelector('.popup__photo').replaceWith(fragment);
};
const createCard = (item) => {
  const { author, offer } = item;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = createType(offer.type, TYPE_RU);
  cardElement.querySelector('.popup__text--capacity').textContent =
    `${offer.rooms} комнат${offer.rooms < 2 ? 'а' : offer.rooms < 5 ? 'ы' : ''} для ${offer.guests} гост${offer.guests > 1 ? 'ей' : 'я'}`;
  cardElement.querySelector('.popup__text--time').textContent = 
    `Заезд после ${offer.checkIn}, выезд до ${offer.checkOut}.`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  filterFeatures(cardElement, offer);
  createPhoto(cardElement, offer);

  return cardElement;
};

const data = createData();
const mapCanvas = document.querySelector('.map__canvas');
const card = createCard(data[0]);

const renderCard = () => mapCanvas && mapCanvas.appendChild(card);

export { renderCard };
