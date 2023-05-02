import { mark } from 'regenerator-runtime';
import View from './View.js';

class PopularView extends View {
  #tags_container = document.querySelector('.popular__tags__container');
  #authors_container = document.querySelector('.popular__authors__container');

  constructor() {
    super();
  }

  /**
   * @description 인기 tag 또는 author 렌더링
   * @param { string[] } data 렌더링할 데이터
   * @param { string } type tag | author
   */
  render(data, type) {
    let markup = '';

    data?.forEach(d => {
      markup += `<div class="popular__${type}" onclick="location.href = '#search?type=${type}${
        type === 'tag' ? 's' : ''
      }&key=${d}'">${d}</div>`;
    });

    if (type === 'tag') {
      this.#tags_container.innerHTML = markup;
    }
    if (type === 'author') {
      this.#authors_container.innerHTML = markup;
    }
  }
}

export default new PopularView();
