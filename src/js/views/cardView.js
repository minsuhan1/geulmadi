import download from 'downloadjs';
import View from './View.js';
import * as htmlToImage from 'html-to-image';

class CardView extends View {
  // 글마디 리스트 컨테이너
  #container = document.querySelector('.posts__container');

  constructor() {
    super();
    this.#renderCard();
    this.#downloadImage();
    this.#changeBgColor();
    this.#shareImage();
  }

  /* 단일 글마디 카드 렌더링 */
  #renderCard() {
    this.#container.addEventListener('click', e => {
      // 글마디 요소를 클릭하지 않은 경우 return
      if (!e.target.closest('blockquote')) return;
      // 수정/삭제 버튼 클릭한 경우 return
      if (e.target.closest('.icons')) return;

      // 클릭한 글마디 요소소
      const post = e.target.closest('.blockquote__list__child');

      if (post) {
        const body = post.querySelector('.body').innerHTML.trim();

        const reference = post.querySelector('.reference').innerHTML.trim();

        const markup = `
        <div class="overlay fadein" onclick="if(event.target === this) { this.classList.add('hidden'); this.remove(); }">
        <div class="card-wrapper">
          <div class="card">
            <div class="content">
              <p>
                ${body}
              </p>
              <h2>${reference}</h2>
              <div class="tabs">
                <div class="palette" title="배경색 변경">
                  <div class="material-icons-outlined">
                  auto_fix_high 
                  </div>
                </div>
                <div class="download" title="사진으로 저장">
                  <div class="material-icons-outlined">
                  file_download  
                  </div>
                </div>
                <div class="share" title="사진으로 공유">
                  <div class="material-icons-outlined">
                  send
                  </div>
                </div>
              </div>
            </div> <!-- content end -->
          </div> <!-- card end -->     
        </div> <!-- card wrapper end -->
      </div> <!-- overlay end -->
        `;

        document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
      }
    });
  }

  /* 이미지 다운로드 (html-to-image library) */
  async #downloadImage() {
    document.querySelector('body').addEventListener('click', e => {
      if (e.target.closest('.download')) {
        // 카드 DOM을 png로 다운로드 (다운로드 버튼 제외)
        const node = document.querySelector('.card');
        htmlToImage
          .toPng(node, {
            filter: node => node.className !== 'tabs',
          })
          .then(dataUrl => {
            download(dataUrl, 'geulmadi.png');
          })
          .catch(e => {});
      }
    });
  }

  /* 사진 공유하기 */
  async #shareImage() {
    document.querySelector('body').addEventListener('click', e => {
      if (e.target.closest('.share')) {
        // 1. 카드 DOM을 png dataUrl로 변환
        // 2. dataUrl을 blob 객체로 변환
        // 3. blob 객체를 File 객체로 변환
        // 4. navigator.share(file객체)로 공유
        const node = document.querySelector('.card');
        htmlToImage
          .toPng(node, {
            filter: node => node.className !== 'tabs',
          })
          .then(async dataUrl => {
            if (navigator.share) {
              // https://developer.mozilla.org/en-US/docs/Web/API/Response/blob
              const blob = await (await fetch(dataUrl)).blob();
              const file = new File([blob], 'geulmadi.png', {
                type: 'image/png',
                lastModified: new Date(),
              });
              navigator.share({ files: [file] }).then(() => {});
            }
          })
          .catch(e => {});
      }
    });
  }

  // 카드 배경색 변경
  #changeBgColor() {
    document.querySelector('body').addEventListener('click', e => {
      if (e.target.closest('.palette')) {
        e.target
          .closest('.content')
          .setAttribute(
            'style',
            `background: linear-gradient(135deg, ${this.#getRandomColor()} 15%, ${this.#getRandomColor()} 100%);`
          );
      }
    });
  }

  // 랜덤 컬러 (rgb값 50~200)
  #getRandomColor() {
    let rgb = '';
    rgb += (Math.floor(Math.random() * 150 + 1) + 50).toString(16); // R to hex
    rgb += (Math.floor(Math.random() * 150 + 1) + 50).toString(16); // G to hex
    rgb += (Math.floor(Math.random() * 150 + 1) + 50).toString(16); // B to hex
    return '#' + rgb;
  }
}

export default new CardView();
