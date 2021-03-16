const main = document.querySelector('main');
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

const showRemoveModal = (modalElement) => {
  main.appendChild(modalElement);
  const removeModalOnClick = () => {
    main.removeChild(modalElement);
    modalElement.removeEventListener('click', removeModalOnClick);
  };
  modalElement.addEventListener('click', removeModalOnClick);
  const removeModalOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      main.removeChild(modalElement);
      document.removeEventListener('keyup', removeModalOnEsc);
    }
  };
  document.addEventListener('keyup', removeModalOnEsc);
};

const showModal = (id) => {
  if (id === 'success') {
    const modalElement = successModalTemplate.cloneNode(true);
    showRemoveModal(modalElement);
  } else if (id === 'error') {
    const modalElement = errorModalTemplate.cloneNode(true);
    showRemoveModal(modalElement);
  }
}

export { showModal };
