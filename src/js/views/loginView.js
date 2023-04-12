class LoginView {
  #btnLogin = document.querySelector('.nav__btn__login');
  #modal = document.querySelector('.login_modal');
  #btnModalClose = document.getElementsByClassName('modal__close__btn')[0];
  #modalRegister = document.querySelector('.register_modal');
  #btnGotoRegister = document.querySelector('.btn__goto__register');

  constructor() {
    this.#addHandlerShowModal();
    this.#addHandlerShowRegisterModal();
  }

  #toggleModal() {
    this.#modal.classList.toggle('hidden');
    this.#modal.classList.toggle('fadein');
  }

  #showRegisterModal() {
    this.#toggleModal();
    this.#modalRegister.classList.toggle('hidden');
    this.#modalRegister.classList.toggle('fadein');
  }

  #addHandlerShowModal() {
    this.#btnLogin.addEventListener('click', this.#toggleModal.bind(this));
    this.#btnModalClose.addEventListener('click', this.#toggleModal.bind(this));
  }

  #addHandlerShowRegisterModal() {
    this.#btnGotoRegister.addEventListener(
      'click',
      this.#showRegisterModal.bind(this)
    );
  }
}

export default new LoginView();
