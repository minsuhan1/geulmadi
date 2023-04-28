import View from './View';

class SearchView extends View {
  #container = document.querySelector('.search__container');
  #input = this.#container.querySelector('input');
  #type = this.#container.querySelector('select');
  #btn_search = this.#container.querySelector('button');

  constructor() {
    super();
    this.#addSubmitListener();
  }

  #addSubmitListener() {
    this.#btn_search.addEventListener('click', e => {
      const keyword = this.#input.value?.trim();
      const type = this.#type.value;
      if (!keyword) {
        this.renderInfoMessage('검색 키워드를 입력해주세요');
      } else {
        this.#input.value = '';
        location.href = `#search?type=${type}&key=${keyword}`;
      }
    });
  }
}

export default new SearchView();
