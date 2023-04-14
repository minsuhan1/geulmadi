import View from './View.js';

class LoginView extends View {
  #btnLogin = document.querySelector('.nav__btn__login');
  #btnLogout = document.querySelector('.nav__btn__logout');
  #modal = document.querySelector('.login_modal');
  #form = document.querySelector('.form__login');
  #btnModalClose = document.getElementsByClassName('modal__close__btn')[0];
  #modalRegister = document.querySelector('.register_modal');
  #btnGotoRegister = document.querySelector('.btn__goto__register');

  constructor() {
    super();
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

  /* 로그아웃 버튼 클릭시 실행할 핸들러를 등록 */
  addHandlerSignOut(handler) {
    this.#btnLogout.addEventListener('click', handler);
  }

  /* 로그인 폼 submit 클릭시 로직 */

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
  /* nav 로그인/로그아웃 버튼 모두 제거 (초기화용) */
  clearHeaderButtons() {
    this.#btnLogin.classList.add('hidden');
    this.#btnLogout.classList.add('hidden');
  }

  // @override
  toggleButtonSpinner() {
    document.querySelector('.submit__login').classList.toggle('spinner');
  }
}

export default new LoginView();
