class LoginView {
  #btnLogin = document.querySelector('.nav__btn__login');
  #modal = document.querySelector('.login_modal');
  #btnModalClose = document.querySelector('.modal__close__btn');

  #toggleModal() {
    this.#modal.classList.toggle('hidden');
    this.#modal.classList.toggle('fadein');
  }

  #addHandlerShowModal() {
    this.#btnLogin.addEventListener('click', this.#toggleModal.bind(this));
    this.#btnModalClose.addEventListener('click', this.#toggleModal.bind(this));
  }

  constructor() {
    this.#addHandlerShowModal();
  }
}

export default new LoginView();
