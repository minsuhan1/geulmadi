import View from './View.js';

class PostListView extends View {
  // 필터 컨테이너
  #filters_container = document.querySelector('.filters__container');
  // 글마디 리스트 컨테이너
  #container = document.querySelector('.posts__container');

  constructor() {
    super();
    this.#addFilterListeners();
  }

  /**
   * @description 필터를 클릭하거나 페이지 새로고침 시 필터 활성화 표시
   */
  #addFilterListeners() {
    // 필터 변경 시 hash 값에 따라 활성화 필터 표시
    ['load', 'hashchange'].forEach(ev =>
      window.addEventListener(ev, () => {
        // 이전 활성화된 버튼의 bottom border 제거
        const btnActivated = this.#filters_container.querySelector('.selected');
        btnActivated?.classList.remove('selected', 'disabled');

        // 현재 필터 버튼에 bottom border 추가
        if (location.hash) {
          if (location.hash.includes('search')) return;
          // 최신/인기/내 글마디/좋아요
          const btn = this.#filters_container
            .querySelector(`a[href='${location.hash}']`)
            .closest('.btn');
          btn.classList.add('selected', 'disabled');
        } else {
          // 최신 (해시값 없을때를 포함)
          const btn = this.#filters_container
            .querySelector("a[href='#recent']")
            .closest('.btn');
          btn.classList.add('selected', 'disabled');
        }
      })
    );
  }

  /**
   * @description IntersectionObserver 콜백함수
   * @param { object } entries
   */
  #stickyFilter(entries) {
    // 목록 컨테이너 가로길이
    const postContainerWidth = this.#container.getBoundingClientRect().width;
    // 필터 컨테이너 세로길이
    const filterHeight = this.#filters_container.getBoundingClientRect().height;

    // Entry object
    const [entry] = entries;
    console.log(entry);

    // 뷰포트에서 popular_container 요소가 사라지기 시작하는 시점에 필터를 고정
    if (!entry.isIntersecting) {
      console.log('container disappeared');
      this.#filters_container.classList.add('sticky');
      this.#filters_container.style.width = `${postContainerWidth}px`;
      // 필터 컨테이너가 차지하던 height만큼 목록 컨테이너를 아래로 내려야 자연스러움
      this.#container.style.marginTop = `${filterHeight}px`;
    }
    // 뷰포트에서 popular_container 요소가 다시 나타나기 시작하는 시점에 필터 고정 해제
    else {
      console.log('container appeared');
      this.#filters_container.classList.remove('sticky');
      this.#container.style.marginTop = `0px`;
    }
  }

  /**
   * @description 모바일에서 sticky filter를 구현하기 위한 popular_container IntersectionObserver 등록
   * @param { object } entries
   */
  #addPopCotnainerObserver() {
    const popContainerObserver = new IntersectionObserver(
      this.#stickyFilter.bind(this),
      {
        root: null, // 전체 뷰포트
        threshold: 0,
      }
    );

    // popular_container를 observe
    const popular_container = document.querySelector('.popular__container');
    popContainerObserver.observe(popular_container);
  }

  /**
   * @description 필터가 선택되거나 페이지가 새로고침될 때 controller가 등록한 handler 실행
   * @param { Function } handler : 주어진 필터에 해당하는 글마디 리스트 로드하는 핸들러
   */
  addHandlerFilter(handler) {
    ['hashchange'].forEach(ev =>
      window.addEventListener(ev, () => {
        handler(location.hash);
      })
    );
  }

  /**
   * @description 삭제 아이콘 클릭 시 handler 실행
   * @param { Function } handler : 삭제 기능 핸들러
   */
  addHandlerBtnDelete(handler) {
    this.#container.addEventListener('click', e => {
      // 삭제 버튼이 아니면 btnDelete === null
      const btnDelete = e.target.closest('.delete');

      if (btnDelete) {
        // 글마디 id
        const postId = btnDelete.closest('.blockquote__list__child').dataset.id;

        handler(postId);
      }
    });
  }

  /**
   * @description 수정 아이콘 클릭 시 handler 실행
   * @param { Function } handler : 수정 기능 핸들러
   */
  addHandlerBtnEdit(handler) {
    this.#container.addEventListener('click', e => {
      // 수정 버튼이 아니면 btnEdit === null
      const btnEdit = e.target.closest('.edit');

      if (btnEdit) {
        // 글마디 id
        const postId = btnEdit.closest('.blockquote__list__child').dataset.id;

        handler(postId);
      }
    });
  }

  /**
   * @description 좋아요 아이콘 클릭 시 handler 실행
   * @param { Function } handler : 좋아요 기능 핸들러
   */
  addHandlerBtnLike(handler) {
    this.#container.addEventListener('click', e => {
      // 클릭한 좋아요 버튼이 포함된 글마디 id 추출(data-id)
      // 좋아요 버튼이 아니면 btnLike === null
      const btnLike = e.target.closest('.material-icons');

      // 좋아요 여부에 따라 좋아요 버튼 및 숫자 렌더링
      if (btnLike) {
        // 로그인 안 한 경우
        if (
          [...document.querySelector('.nav__btn__logout').classList].includes(
            'hidden'
          )
        ) {
          this.renderInfoMessage('로그인이 필요합니다');
          return;
        }

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
   * @param { String } uid : 유저 id
   */
  render(dataArr, userFavorites, uid) {
    let markup = '';

    // ID of posts

    dataArr.forEach(data => {
      const id = data[0];
      const post = data[1];

      // 좋아요 표시한 글마디인지 여부
      const liked = userFavorites
        ? userFavorites.includes(id)
          ? true
          : false
        : false;

      // 자신이 업로드한 글마디인지 여부
      const mine = post.uid === uid;

      // 글마디 컴포넌트 렌더링
      markup += `
        <div class="blockquote__list__child" data-id="${id}">
          <blockquote class="blockquote__${post.type}">
            <div class="body">
            ${post.body}
            </div>
            <span>
              <div class="reference">
                &ndash; ${post.author}, 《${post.reference}》
              </div>
              ${
                mine
                  ? `<div class="icons">
              <span class="material-icons edit" title="수정">
                edit
              </span>
              <span class="material-icons delete" title="삭제">
                delete
              </span>
            </div>`
                  : ''
              }            
            </span>
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

    // 글마디 리스트 컴포넌트에 추가
    this.#container.insertAdjacentHTML('afterbegin', markup);
    // 필터 intersectionObserver 추가
    this.#addPopCotnainerObserver();
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

  /**
   * @description 로딩 시 스피너 표시
   */
  toggleSpinner() {
    this.#container
      .querySelector('.spinner__container')
      .classList.toggle('hidden');
  }

  /**
   * @description 빈 목록 아이콘 표시
   */
  showEmptyBox() {
    const markup = `
      <div class="empty">
        <img src="assets/img/empty-box.png" width="20%" alt="empty-box"/>
        <div>아무것도 없네요!</div>
      </div>
    `;
    this.#container.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new PostListView();
