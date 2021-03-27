const OFFER_TYPE_RU = [{ id: 'flat', name: 'Квартира ' }, { id: 'bungalow', name: 'Бунгало' }, { id: 'house', name: 'Дом' }, { id: 'palace', name: 'Дворец' }];
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const getOfferType = (type, dictionary) => {
  return dictionary.find(item => item.id === type).name;
}
const filterFeatures = (cardElement, offer) => {
  const features = cardElement.querySelector('.popup__features');
  const featuresItems = features.querySelectorAll('.popup__feature');
  featuresItems.forEach(element => {
    offer.features.some(feature => element.className.includes(`-${feature}`))
      ? true
      : element.remove();
  })
};
const createPopupPhotos = (cardElement, offer) => {
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
  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  const timeElement = cardElement.querySelector('.popup__text--time');
  const descriptionElement = cardElement.querySelector('.popup__description');
  const avatarElement = cardElement.querySelector('.popup__avatar');

  titleElement.textContent = offer.title ? offer.title : titleElement.remove();
  addressElement.textContent = offer.address ? offer.address : addressElement.remove();
  priceElement.textContent = offer.price ? `${offer.price} ₽/ночь` : priceElement.remove();
  typeElement.textContent = offer.type ? getOfferType(offer.type, OFFER_TYPE_RU) : typeElement.remove();
  capacityElement.textContent = offer.rooms
    ? `${offer.rooms} комнат${offer.rooms < 2 ? 'а' : offer.rooms < 5 ? 'ы' : ''} для ${offer.guests} гост${offer.guests > 1 ? 'ей' : 'я'}`
    : capacityElement.remove();
  timeElement.textContent = offer.checkin && offer.checkout
    ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`
    : timeElement.remove();
  descriptionElement.textContent = offer.description ? offer.description : descriptionElement.remove();
  avatarElement.src = author.avatar ? author.avatar : avatarElement.remove();
  filterFeatures(cardElement, offer);
  createPopupPhotos(cardElement, offer);

  return cardElement;
};

export { createCard };
