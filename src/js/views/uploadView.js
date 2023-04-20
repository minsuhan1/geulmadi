import View from './View.js';

class UploadView extends View {
  #btnAddFloating = document.querySelector('.add__btn__floating');
  #modal = document.querySelector('.upload_modal');
  #form = this.#modal.querySelector('.form__modal');
  #btnClose = this.#modal.querySelector('.modal__close__btn');
  #btnSubmit = this.#form.querySelector('.submit_btn');

  constructor() {
    super();
    this.#addHandlerShowModal();
    this.#addHandlerSelectType();
  }

  /**
   * @description 글마디 등록 모달 창 여닫기 기능
   */
  #addHandlerShowModal() {
    this.#btnAddFloating.addEventListener(
      'click',
      this.#toggleModal.bind(this)
    );
    this.#btnClose.addEventListener('click', this.#toggleModal.bind(this));
  }

  /**
   * @description 선택한 글마디 종류에 따라 폼 양식을 변경
   */
  #addHandlerSelectType() {
    const labels = this.#form.getElementsByClassName('label');
    const inputs = this.#form.querySelectorAll('input[type="text"]');
    const textarea = this.#form.querySelector('textarea');

    this.#form.querySelector('#lyric').addEventListener('click', () => {
      labels[1].textContent = '노래 제목이 무엇인가요?';
      inputs[0].placeholder = '노래 제목';
      labels[2].textContent = '누구의 노래인가요?';
      inputs[1].placeholder = '가수 이름';
      textarea.placeholder = '공유하고 싶은 가사를 입력해주세요';
    });

    this.#form.querySelector('#phrase').addEventListener('click', () => {
      labels[1].textContent = '책 제목이 무엇인가요?';
      inputs[0].placeholder = '책 제목';
      labels[2].textContent = '누가 쓴 책인가요?';
      inputs[1].placeholder = '작가 이름';
      textarea.placeholder = '공유하고 싶은 구절을 입력해주세요';
    });
  }

  /**
   * @description 모달 창 여닫기
   */
  #toggleModal() {
    this.#form.reset();
    this.#modal.classList.toggle('hidden');
    this.#modal.classList.toggle('fadein');
  }

  /**
   * @param { function } handler Controller의 글마디 등록 진행 함수
   * @description 제출 이벤트 발생 시 Controller가 실행하는 handler 등록
   */
  addHandlerUpload(handler) {
    this.#form.addEventListener('submit', function (e) {
      e.preventDefault();
      // 폼 데이터 수집 객체
      const formData = [...new FormData(this)].map(data => data[1]);

      handler(formData);
    });
  }

  toggleButtonSpinner() {
    this.#btnSubmit.classList.toggle('spinner');
  }

  closeModal() {
    this.#toggleModal();
  }
}

export default new UploadView();
