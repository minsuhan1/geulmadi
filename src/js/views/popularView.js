import { mark } from 'regenerator-runtime';
import View from './View.js';

class PopularView extends View {
  #container = document.querySelector('.popular__container');
  #tags_container = document.querySelector('.popular__tags__container');
  #authors_container = document.querySelector('.popular__authors__container');

  #tags_open = false;
  #authors_open = false;

  constructor() {
    super();
    this.#addExpandListener();
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

  /**
   * @description 모바일 환경에서 인기 탭 여닫기
   */
  #addExpandListener() {
    this.#container.addEventListener('click', e => {
      if (e.target.classList.contains('expand')) {
        let type = e.target.closest('.label__popular__tags')
          ? 'tags'
          : 'authors';

        // 여닫기 아이콘
        const expand_icon = document
          .querySelector(`.label__popular__${type}`)
          .querySelector('.expand');
        // 목록 컨테이너
        const hider =
          type === 'tags'
            ? this.#tags_container.closest('.container__hide__responsive')
            : this.#authors_container.closest('.container__hide__responsive');

        // 각 탭별로 opened 여부에 따라 목록 표시/숨기기
        let state = type === 'tags' ? this.#tags_open : this.#authors_open;

        if (!state) {
          hider.style.cssText = `
              display: block;
              animation: fadeInDown 0.5s;
              `;
          expand_icon.style.cssText = `
              transform: rotate(180deg);
              transition: all 0.5s;
            `;
        } else {
          hider.style.cssText = '';
          expand_icon.style.cssText = `
              transition: all 0.5s;
            `;
        }

        if (type === 'tags') this.#tags_open = !state;
        else this.#authors_open = !state;
      }
    });
  }
}

export default new PopularView();
