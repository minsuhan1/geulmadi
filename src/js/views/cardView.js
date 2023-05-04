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
  }

  /* 단일 글마디 카드 렌더링 */
  #renderCard() {
    this.#container.addEventListener('click', e => {
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
                <div class="palette">
                  <div class="material-icons-outlined">
                  auto_fix_high 
                  </div>
                </div>
                <div class="download">
                  <div class="material-icons-outlined">
                  file_download  
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

  // 이미지 다운로드 (html-to-image library)
  #downloadImage() {
    document.querySelector('body').addEventListener('click', e => {
      if (e.target.closest('.download')) {
        // 카드 DOM을 png로 다운로드 (다운로드 버튼 제외)
        const node = document.querySelector('.card');
        htmlToImage
          .toPng(node, {
            filter: node => node.className !== 'tabs',
          })
          .then(dataUrl => download(dataUrl, 'geulmadi.png'))
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

  // 랜덤 컬러(rgb값 50~200)
  #getRandomColor() {
    let rgb = '';
    rgb += (Math.floor(Math.random() * 150 + 1) + 50).toString(16); // R to hex
    rgb += (Math.floor(Math.random() * 150 + 1) + 50).toString(16); // G to hex
    rgb += (Math.floor(Math.random() * 150 + 1) + 50).toString(16); // B to hex
    return '#' + rgb;
  }
}

export default new CardView();
