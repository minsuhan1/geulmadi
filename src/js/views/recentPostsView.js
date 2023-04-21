import { API_URL_LIKES } from '../config.js';
import View from './View.js';

class RecentPostsView extends View {
  // 글마디 리스트 컨테이너
  #container = document.querySelector('.collection__container');

  constructor() {
    super();
  }

  /**
   * @description 좋아요 아이콘 클릭 시 handler 실행
   * @param { Function } handler : 좋아요 기능 핸들러
   */
  addHandlerBtnLike(handler) {
    this.#container.addEventListener('click', e => {
      // 로그인 안 한 경우
      if (
        [...document.querySelector('.nav__btn__logout').classList].includes(
          'hidden'
        )
      ) {
        this.renderInfoMessage('로그인이 필요합니다');
        return;
      }

      // 클릭한 좋아요 버튼이 포함된 글마디 id 추출(data-id)
      // 좋아요 버튼이 아니면 btnLike === null
      const btnLike = e.target.closest('.material-icons');

      // 좋아요 여부에 따라 좋아요 버튼 및 숫자 렌더링
      if (btnLike) {
        const likeNum = btnLike.nextElementSibling;
        const postId = e.target.closest('.blockquote__list__child').dataset.id;

        // 좋아요
        if (btnLike.classList.contains('icon__favorite__off')) {
          btnLike.classList.remove('icon__favorite__off');
          btnLike.classList.add('icon__favorite__on');
          btnLike.textContent = 'favorite';
          likeNum.classList.add('favorite');
          likeNum.textContent = +likeNum.textContent + 1;

          // 좋아요 여부 반영 (CONTROLLER)
          handler(postId, 'on');
        }

        // 좋아요 취소
        else if (btnLike.classList.contains('icon__favorite__on')) {
          btnLike.classList.remove('icon__favorite__on');
          btnLike.classList.add('icon__favorite__off');
          btnLike.textContent = 'favorite_border';
          likeNum.classList.remove('favorite');
          likeNum.textContent = +likeNum.textContent - 1;

          // 좋아요 여부 반영 (CONTROLLER)
          handler(postId, 'off');
        }
      }
    });
  }

  /**
   * @description 주어진 글마디 데이터를 리스트 컨테이너에 렌더링
   * @param { Object[] } data : 렌더링한 글마디 데이터 배열
   * @param { String[] } userFavorites : 유저가 좋아요한 글마디 id 배열
   */
  render(data, userFavorites) {
    let markup = '';

    // ID of posts
    const ids = Object.keys(data);
    ids.reverse(); // 최신순 정렬

    ids.forEach(id => {
      const post = data[id];
      const liked = userFavorites
        ? userFavorites.includes(id)
          ? true
          : false
        : false;

      markup += `
        <div class="blockquote__list__child" data-id="${id}">
          <blockquote class="blockquote__${post.type}">
            ${post.body}
            <span>&ndash; ${post.author}, 《${post.reference}》</span>
          </blockquote>
          <div class="blockquote__list__child__like__area">
            <span class="material-icons icon__favorite__${
              liked ? 'on' : 'off'
            }">
              favorite${liked ? '' : '_border'}
            </span>
            <div class="blockquote__like__num ${liked ? 'favorite' : ''}">
              ${post.likesNum}
            </div>
          </div>
        </div>
      `;
    });

    this.#container.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * @description 글마디 리스트 컨테이너 초기화
   */
  clearList() {
    this.#container.innerHTML = '';
    this.#container.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner__container hidden"></div>`
    );
  }

  toggleSpinner() {
    this.#container
      .querySelector('.spinner__container')
      .classList.toggle('hidden');
  }
}

export default new RecentPostsView();
