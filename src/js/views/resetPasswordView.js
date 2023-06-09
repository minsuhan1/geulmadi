import View from './View.js';

class ResetPasswordView extends View {
  #modal = document.querySelector('.reset_psw_modal');
  #form = this.#modal.querySelector('.form__modal');
  #btnModalClose = this.#form.querySelector('.modal__close__btn');
  #btnSubmit = this.#form.querySelector('.submit_btn');

  constructor() {
    super();
    this.#addHandlerShowModal();
  }

  /* 모달 창 여닫기 기능 */
  #addHandlerShowModal() {
    this.#btnModalClose.addEventListener('click', this.#toggleModal.bind(this));
  }

  #toggleModal() {
    // 모든 input value 제거
    this.#form.reset();
    this.#modal.classList.toggle('hidden');
    this.#modal.classList.toggle('fadein');
  }

  /**
   *
   * @param { function } handler Controller의 비밀번호 재설정 진행 함수
   * @description 비밀번호 재설정 링크 보내기 버튼을 눌렀을 때 재설정을 진행하는 핸들러 함수가 실행될 수 있도록 핸들러를 등록함
   */
  addHandlerResetPassword(handler) {
    this.#form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = [...new FormData(this)].map(data => data[1]);
      const email = formData[0];

      handler(email);
    });
  }

  /* 비밀번호 찾기 창 닫기 */
  closeModal() {
    this.#toggleModal();
  }

  // @override
  toggleButtonSpinner() {
    this.#btnSubmit.classList.toggle('spinner');
  }
}

export default new ResetPasswordView();
