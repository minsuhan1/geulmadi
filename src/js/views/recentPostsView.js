import View from './View.js';

class RecentPostsView extends View {
  // 글마디 리스트 컨테이너
  #container = document.querySelector('.collection__container');

  constructor() {
    super();
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * @description 주어진 글마디 데이터를 리스트 컨테이너에 렌더링
   * @param { Object[] } data : 렌더링한 글마디 데이터 배열
   */
  render(data) {
    let markup = '';

    // ID of posts
    const ids = Object.keys(data);
    ids.reverse(); // 최신순 정렬

    ids.forEach(id => {
      const post = data[id];
      markup += `
        <div class="blockquote__list__child" data-id="${id}">
          <blockquote class="blockquote__${post.type}">
            ${post.body}
            <span>&ndash; ${post.author}, 《${post.reference}》</span>
          </blockquote>
          <div class="blockquote__list__child__like__area">
            <span class="material-icons icon__favorite__off">
              favorite_border
            </span>
            <div class="blockquote__like__num">
              ${post.likesNum}
            </div>
          </div>
        </div>
      `;
    });

    this.#container.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#container.innerHTML = '';
  }

  toggleSpinner() {
    this.#container
      .querySelector('.spinner__container')
      .classList.toggle('hidden');
  }
}

export default new RecentPostsView();
