const main = document.querySelector('main');
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

const renderModal = (modalElement) => {
  main.appendChild(modalElement);
  const onModalOverlayClick = () => {
    main.removeChild(modalElement);
    modalElement.removeEventListener('click', onModalOverlayClick);
  };
  modalElement.addEventListener('click', onModalOverlayClick);
  const onDocumentKeyup = (evt) => {
    if (evt.key === 'Escape') {
      main.removeChild(modalElement);
      document.removeEventListener('keyup', onDocumentKeyup);
    }
  };
  document.addEventListener('keyup', onDocumentKeyup);
};

const showModal = (id) => {
  if (id === 'success') {
    const modalElement = successModalTemplate.cloneNode(true);
    renderModal(modalElement);
  } else if (id === 'error') {
    const modalElement = errorModalTemplate.cloneNode(true);
    renderModal(modalElement);
  }
}

export { showModal };
