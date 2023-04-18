import View from './View.js';

class LoginView extends View {
  // header nav
  #btnLogin = document.querySelector('.nav__btn__login');
  #btnLogout = document.querySelector('.nav__btn__logout');
  #btnAccount = document.querySelector('.nav__btn__account');

  // login window
  #modal = document.querySelector('.login_modal');
  #form = this.#modal.querySelector('.form__modal');
  #btnModalClose = this.#form.querySelector('.modal__close__btn');
  #btnLoginGoogle = document.querySelector('.google__login__btn');
  #btnSubmit = this.#form.querySelector('.submit_btn');

  // goto elements
  #modalRegister = document.querySelector('.register_modal');
  #modalResetPsw = document.querySelector('.reset_psw_modal');
  #btnGotoRegister = document.querySelector('.btn__goto__register');
  #btnGotoResetPsw = document.querySelector('.btn__goto__reset__psw');

  constructor() {
    super();
    this.#addHandlerShowModal();
    this.#addHandlerShowRegisterModal();
    this.#addHandlerShowResetPswModal();
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

  #showResetPswModal() {
    this.#toggleModal();
    this.#modalResetPsw.classList.toggle('hidden');
    this.#modalResetPsw.classList.toggle('fadein');
  }

  #addHandlerShowModal() {
    this.#btnLogin.addEventListener('click', this.#toggleModal.bind(this));
    this.#btnModalClose.addEventListener('click', this.#toggleModal.bind(this));

    this.#form.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });
  }

  #addHandlerShowRegisterModal() {
    this.#btnGotoRegister.addEventListener(
      'click',
      this.#showRegisterModal.bind(this)
    );
  }

  #addHandlerShowResetPswModal() {
    this.#btnGotoResetPsw.addEventListener(
      'click',
      this.#showResetPswModal.bind(this)
    );
  }

  /* 로그아웃 버튼 클릭시 실행할 핸들러를 등록 */
  addHandlerSignOut(handler) {
    this.#btnLogout.addEventListener('click', handler);
  }

  /* 로그인 폼 submit 클릭시 로직 */

  /**
   *
   * @param { function } handler Controller의 Google 로그인 진행 함수
   * @description Google 로그인을 진행하는 핸들러 함수가 실행될 수 있도록 핸들러를 등록
   */
  addHandlerSignInWithGoogle(handler) {
    this.#btnLoginGoogle.addEventListener('click', function (e) {
      // form 제출동작 방지
      e.preventDefault();
      handler();
    });
  }

  /**
   *
   * @param { function } handler Controller의 로그인 진행 함수
   * @description 로그인 폼 제출버튼을 눌렀을 때 로그인을 진행하는 핸들러 함수가 실행될 수 있도록 핸들러를 등록함
   */
  addHandlerSignIn(handler) {
    this.#form.addEventListener('submit', function (e) {
      // 이벤트 리스너의 this는 이벤트를 감지한 해당 요소임
      // FormData 객체는 form의 input 요소들을 ['name', 'value'] 형태로 매핑해 준다.
      const formData = [...new FormData(this)].map(data => data[1]);

      e.preventDefault();
      handler(formData);
    });
  }

  /* 로그인 창 닫기 */
  closeModal() {
    // 모든 input value 제거
    this.#form.reset();
    this.#toggleModal();
  }

  /* nav 로그인 버튼 보이기 */
  showNavLoginButton() {
    this.#btnLogin.classList.remove('hidden');
  }
  /* nav 로그아웃 버튼 보이기 */
  showNavLogOutButton() {
    this.#btnLogout.classList.remove('hidden');
  }
  /* nav 프로필 버튼 보이기 */
  showNavAccountButton(tooltipText) {
    this.#btnAccount.classList.remove('hidden');
    document.querySelector('.account__text').textContent = `${tooltipText}`;
  }
  /* nav 로그인/로그아웃 버튼 모두 제거 (초기화용) */
  clearHeaderButtons() {
    this.#btnLogin.classList.add('hidden');
    this.#btnLogout.classList.add('hidden');
    this.#btnAccount.classList.add('hidden');
  }

  // @override
  toggleButtonSpinner() {
    this.#btnSubmit.classList.toggle('spinner');
  }
}

export default new LoginView();
