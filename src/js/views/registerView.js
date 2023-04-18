import View from './View.js';

class RegisterView extends View {
  #modal = document.querySelector('.register_modal');
  #form = this.#modal.querySelector('.form__modal');
  #btnModalClose = this.#form.querySelector('.modal__close__btn');
  #btnSubmit = this.#form.querySelector('.submit_btn');

  #pswInput = this.#form.querySelector("[name='psw']");
  #pswChkInput = this.#form.querySelector("[name='psw_chk']");

  constructor() {
    super();

    this.#addHandlerShowModal();

    /* 비밀번호 일치여부 확인 이벤트 등록 */
    this.#pswInput.addEventListener(
      'change',
      this.#validatePassword.bind(this)
    );
    this.#pswChkInput.addEventListener(
      'keyup',
      this.#validatePassword.bind(this)
    );
  }

  /* 회원가입 모달 창 여닫기 기능 */
  #addHandlerShowModal() {
    this.#btnModalClose.addEventListener('click', this.#toggleModal.bind(this));
  }

  #toggleModal() {
    this.#modal.classList.toggle('hidden');
    this.#modal.classList.toggle('fadein');
  }

  /* 회원가입 폼 submit 클릭시 로직 */

  /**
   * @description 비밀번호 확인란 일치 여부 확인
   */
  #validatePassword() {
    if (this.#pswInput.value !== this.#pswChkInput.value) {
      // 브라우저 API인 setCustomValidity를 사용하여 오류 메시지를 표시하고 폼이 제출되지 않게 함
      this.#pswChkInput.setCustomValidity('비밀번호가 일치하지 않습니다');
    } else {
      // 오류 메시지를 비워주어야 폼이 제출됨
      this.#pswInput.setCustomValidity('');
      this.#pswChkInput.setCustomValidity('');
    }
  }

  /**
   *
   * @param { function } handler Controller의 회원가입 진행 함수
   * @description 회원가입 폼 제출버튼을 눌렀을 때 회원가입을 진행하는 핸들러 함수가 실행될 수 있도록 핸들러를 등록함
   */
  addHandlerCreateAccount(handler) {
    this.#form.addEventListener('submit', function (e) {
      // 이벤트 리스너의 this는 이벤트를 감지한 해당 요소임
      // FormData 객체는 form의 input 요소들을 ['name', 'value'] 형태로 매핑해 준다.
      const formData = [...new FormData(this)].map(data => data[1]);

      e.preventDefault();
      handler(formData);
    });
  }

  /* 회원가입 창 닫기 */
  closeModal() {
    // 모든 input value 제거
    this.#form.reset();
    this.#toggleModal();
  }

  // @override
  toggleButtonSpinner() {
    this.#btnSubmit.classList.toggle('spinner');
  }
}

export default new RegisterView();
