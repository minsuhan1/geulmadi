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
    this.#form
      .querySelector('#lyric')
      .addEventListener(
        'click',
        this.#renderPlaceHolderAsType.bind(this, 'lyric')
      );

    this.#form
      .querySelector('#phrase')
      .addEventListener(
        'click',
        this.#renderPlaceHolderAsType.bind(this, 'phrase')
      );
  }

  /**
   * @description 글마디 타입에 따라 폼 양식 변경
   * @param { String } type : 'phrase' | 'lyric'
   */
  #renderPlaceHolderAsType(type) {
    const labels = this.#form.getElementsByClassName('label');
    const inputs = this.#form.querySelectorAll('input[type="text"]');
    const textarea = this.#form.querySelector('textarea');

    if (type === 'phrase') {
      labels[1].textContent = '책 제목이 무엇인가요?';
      inputs[0].placeholder = '책 제목';
      labels[2].textContent = '누가 쓴 책인가요?';
      inputs[1].placeholder = '작가 이름';
      textarea.placeholder = '공유하고 싶은 구절을 입력해주세요';
    }

    if (type === 'lyric') {
      labels[1].textContent = '노래 제목이 무엇인가요?';
      inputs[0].placeholder = '노래 제목';
      labels[2].textContent = '누구의 노래인가요?';
      inputs[1].placeholder = '가수 이름';
      textarea.placeholder = '공유하고 싶은 가사를 입력해주세요';
    }
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

  /**
   * @description 글마디 수정을 위한 모달 창 열기
   * @param { Object } 수정할 글마디 데이터
   */
  openEditModal(postData) {
    // 업로드 모달 창 열기
    this.#toggleModal();

    // 원본 글마디 데이터를 입력창에 표시
    const inputs = this.#form.querySelectorAll('input[type="text"]');
    const textarea = this.#form.querySelector('textarea');

    inputs[0].value = postData.reference;
    inputs[1].value = postData.author;
    textarea.textContent = postData.body.replaceAll('<br>', '\n');
    inputs[2].value = postData.tags.join(',');

    // 원본 글마디 type에 따라 버튼 선택 및 양식 변경
    const radioInputs = this.#form.querySelectorAll('input[type="radio"]');

    if (postData.type === 'lyric') {
      // 기본값은 '책'
      // 가사인 경우 가사 버튼 선택
      radioInputs[0].checked = false;
      radioInputs[1].checked = true;
    }
    this.#renderPlaceHolderAsType(postData.type);
  }
}

export default new UploadView();
