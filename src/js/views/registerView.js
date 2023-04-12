class RegisterView {
  #modal = document.querySelector('.register_modal');
  #btnModalClose = document.getElementsByClassName('modal__close__btn')[1];

  constructor() {
    this.#addHandlerShowModal();
  }

  #addHandlerShowModal() {
    this.#btnModalClose.addEventListener('click', this.#toggleModal.bind(this));
  }

  #toggleModal() {
    this.#modal.classList.toggle('hidden');
    this.#modal.classList.toggle('fadein');
  }
}

export default new RegisterView();
