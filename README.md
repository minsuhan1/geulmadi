# ✍️ Toy Project : 글마디

### ▪️ 프로젝트 소개

> '글마디'는 책이나 노래에서 발견한 인상적인 문구나 가사를 기록하고, 서로 공유하는 웹서비스입니다. <br><br>
> 책을 읽거나 노래를 듣다가 감명깊은 구절을 발견했나요? <br>
> 마음에만 담아두다 잊혀질까 아쉬운 구절을 기록해보세요 <br>
> 그리고 주변의 소중한 사람들에게 예쁜 사진으로도 공유해보세요 <br>

### ▪️ 프로젝트 기간

- 2023.04.05 ~ 2023. 05. 09

### ▪️ 프로젝트 개요

- [글마디 웹사이트 바로가기](https://geulmadi.netlify.app/)
- [프로젝트 회고 (미완)](링크)

### ▪️ 기술 스택

- JavaScript (ES6) / SASS (SCSS) / HTML
- Firebase (Realtime Database, Authentication)
- MVC Architecture

### ▪️ package.json

```json
{
  "name": "geulmadi",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  },
  "keywords": [],
  "author": "Minsu Han",
  "license": "ISC",
  "devDependencies": {
    "@parcel/transformer-sass": "^2.8.3",
    "dotenv": "^16.0.3",
    "downloadjs": "^1.4.7",
    "firebase": "^9.19.1",
    "html-to-image": "^1.11.11",
    "localtunnel": "^2.0.2",
    "parcel-bundler": "^1.12.5",
    "parcel-plugin-static-files-copy": "^2.6.0",
    "regenerator-runtime": "^0.13.11",
    "sass": "^1.61.0",
    "sweetalert2": "^11.7.3"
  },
  "staticFiles": {
    "staticPath": "static"
  }
}
```

### ▪️ 개발 환경

- 계획 및 일정관리 ➡️ [Notion](https://accurate-bank-c77.notion.site/cfce9924c3e44aa8ad5935acf35c21ea)

  ![image](https://github.com/minsuhan1/JavaScript_course_2022/assets/50696567/e66b75bf-c697-4c25-893f-5a25651f613a)

- IDE ➡️ Visual Studio Code

- 버전관리 ➡️ Git + [GitHub](https://github.com/minsuhan1/geulmadi)

- 와이어프레임 제작 ➡️ [Figma](https://www.figma.com/file/6yNejRcsjim7nQ3jw2myPt/%EA%B8%80%EB%A7%88%EB%94%94?type=design&node-id=0-1&t=UzksdTBY8k87O6Wx-0)

### ▪️ 디렉터리 구조

```bash
📦
├─ .gitignore
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ .env
├─ src
│  ├─ js
│  │  ├─ auth.js
│  │  ├─ config.js
│  │  ├─ controllers
│  │  │  ├─ loginController.js
│  │  │  └─ postController.js
│  │  ├─ helpers.js
│  │  ├─ model
│  │  │  └─ model.js
│  │  └─ views
│  │     ├─ .prettierrc
│  │     ├─ View.js
│  │     ├─ cardView.js
│  │     ├─ loginView.js
│  │     ├─ popularView.js
│  │     ├─ postListView.js
│  │     ├─ registerView.js
│  │     ├─ resetPasswordView.js
│  │     ├─ searchView.js
│  │     └─ uploadView.js
│  └─ sass
│     ├─ _base.scss
│     ├─ _card.scss
│     ├─ _collection.scss
│     ├─ _components.scss
│     ├─ _forms.scss
│     ├─ _header.scss
│     ├─ _helpers.scss
│     ├─ _hero.scss
│     ├─ _mixins.scss
│     └─ main.scss
└─ static
   └─ assets
      └─ img
         ├─ empty-box.png
         ├─ logo.png
         └─ ogImage.png
```

©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)

<br />

### ▪️ 구현한 기능

- `Firebase Authentication`을 활용한 회원가입/로그인 인증
- `.env` 파일을 통한 API KEY 보안 관리 (`dotenv`)
- `Firebase Realtime Database`를 활용한 글마디 추가/로드/수정/삭제 및 좋아요 기능
- `hashchange` 이벤트 리스너를 활용한 카테고리(최신/인기/내 글마디/좋아요) 기능
- 상위 20개 인기 태그, 인기 작가/가수 표시 기능
- 키워드/분류 기반 검색 기능
- `html-to-image`, `downloadjs` 라이브러리를 활용한 글마디 카드 PNG 다운로드 기능
- `Web Share API` 및 `blob`을 활용한 글마디 카드 외부 공유 기능
- 모바일 반응형 UI 구현 (`mediaQuery`, `@mixin`, `IntersectionObserver API`)

<br />

### ▪️ 구현 기능 요약

#### ① Firebase Authentication 기반 계정생성/로그인

> 구현 과정 회고 ➡️
> [[글마디 프로젝트] Firebase 인증 기능 적용 회고 (feat. MVC 모델)](https://velog.io/@minsuhan1/FE-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-Firebase-%EC%9D%B8%EC%A6%9D-%EA%B8%B0%EB%8A%A5-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-feat.-MVC-%EB%AA%A8%EB%8D%B8)

![Animation](https://github.com/minsuhan1/JavaScript_course_2022/assets/50696567/19042c53-8a2d-4308-99f7-84ff5fa02b0a)

- `Firebase Authentication`을 적용하여 이메일/비밀번호 기반 계정생성/로그인/로그아웃, Google 소셜 로그인 기능을 구현했습니다. DEMO 배포 전에는 API KEY 보안을 위해 환경변수를 파일로 관리하게 해 주는 `dotenv` 라이브러리를 사용하여 .env 파일 내에 API KEY 값을 작성하고, 실제 Firebase 객체를 Initialize하는 `auth.js`에서 불러와서 사용하도록 했습니다.

```js
import dotenv from "dotenv";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

dotenv.config();

class Auth {
  // Your web app's Firebase configuration
  #firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  // Initialize Firebase
  #firebase_app = initializeApp(this.#firebaseConfig);
  #auth = getAuth(this.#firebase_app);
}

export default new Auth();
```

- Firebase 인증을 구현하는 데 필요한 코드를 아래와 같이 MVC 모델로 분리하였습니다.

  - Model : auth.js ➡️ 인증 작업을 수행하는 API 제공
  - View : loginView.js, registerView.js ➡️ 유저의 화면단에서의 인증 요청을 감지하는 핸들러 제공
  - Controller : loginController.js ➡️ 인증 진행과정 총괄

```js
> auth.js

async signInEmail(email, password) {
  try {
    // ret data: (userCredential);
    const data = await signInWithEmailAndPassword(
      this.#auth,
      email,
      password
    );
    return data;
  } catch (err) {
    throw err;
  }
}
```

```js
> loginView.js

addHandlerSignIn(handler) {
  this.#form.addEventListener('submit', function (e) {
    // FormData 객체는 form의 input 요소들을 ['name', 'value'] 형태로 매핑해 준다.
    const formData = [...new FormData(this)].map(data => data[1]);

    e.preventDefault();
    handler(formData);
  });
}
```

```js
> loginController.js

import auth from "../auth.js";
import loginView from "../views/loginView.js";

const controlSignIn = async function (formData) {
  try {
    // Firebase 로그인 인증 대기
    // formData[0]: Email, formData[1]: Password
    const data = await auth.signInEmail(formData[0], formData[1]);
    // 인증 완료 메시지 표시
    loginView.renderSuccessMessage("로그인 성공");
  } catch (err) {
    // 오류코드에 따른 메시지 표시
    loginView.renderError(convertErrorCodeToMessage(err.code));
  }
};

const convertErrorCodeToMessage = function (errCode) {
  switch (errCode) {
    case "auth/wrong-password":
      return "이메일 혹은 비밀번호가 일치하지 않습니다.";
    case "auth/user-not-found":
      return "존재하지 않는 계정입니다.";
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    // ... 그 외 다양한 오류코드 처리 코드
    default:
      return "오류가 발생했습니다. 다시 시도해주세요";
  }
};

loginView.addHandlerSignIn(controlSignIn);
```

- 위 코드는 유저의 로그인 버튼 클릭을 감지했을 때 Controller가 View로부터 유저가 제출한 이메일/비밀번호 값을 받아서 Auth가 제공하는 `signInEmail` 메서드를 호출하여 인증을 요청하고 결과를 수신하는 코드입니다.

- 이러한 방식으로 여러 인증 기능들을 수행하기 위해 Auth측에서 제공하는 API는 아래와 같습니다.

  - signUpEmail ➡️ 이메일/패스워드 기반의 Firebase 계정을 생성합니다. 내부적으로 Firebase Auth에서 제공하는 `createUserWithEmailAndPassword` 메서드를 사용합니다.

  - signInEmail ➡️ 이메일/패스워드 기반의 Firebase 계정으로 로그인합니다. 내부적으로 Firebase Auth에서 제공하는 `signInWithEmailAndPassword` 메서드를 사용합니다.

  - signOutUser ➡️ 현재 로그인 상태의 Firebase 계정에서 로그아웃합니다. 내부적으로 Firebase Auth에서 제공하는 `signOut` 메서드를 사용합니다.

  - resetPassword ➡️ 계정의 비밀번호를 재설정하는 링크를 이메일로 전송합니다. 내부적으로 Firebase Auth에서 제공하는 `sendPasswordResetEmail` 메서드를 사용합니다.

  - signInGoogle ➡️ Google 계정으로 로그인할 수 있는 팝업창을 표시해줍니다. 내부적으로 Firebase Auth의 `GoogleAuthProvider` 객체가 제공하는 `signInWithPopup` 메서드를 사용합니다.

- Firebase Auth에서 제공하는 `onAuthStateChanged` 메서드를 사용하여 로그인, 로그아웃 등으로 인한 현재 인증 상태 및 정보 변경이 감지되었을 때 Controller에서 수행할 handler 메서드를 등록하였습니다.

```js
> auth.js

onUserStateChange(handler) {
  this.#auth.onAuthStateChanged((user) => {
    handler(user);
  });
}
```

```js
> loginController.js

/**
 * @description 로그인 정보 변경 감지 시 Auth 정보 초기화
 * @param { Object } userCredential 유저 정보 객체
 */
const init = async function (user) {
  // ... Auth 정보 초기화 코드
};

auth.onUserStateChange(init);
```

<br />

#### ② 글마디 CRUD 및 좋아요 기능 (Realtime Database)

> 구현 과정 회고 ➡️
> [[글마디 프로젝트] Realtime Database를 활용한 글마디 CRUD 및 좋아요 기능 구현 회고](https://velog.io/@minsuhan1/title-zlx5x36r#%EC%8B%9C%EC%9E%91%ED%95%98%EB%A9%B0)

![Animation](https://github.com/minsuhan1/JavaScript_course_2022/assets/50696567/ad91b206-bb60-487c-b041-c4d81ff0f452)

- `Firebase Realtime DB`를 사용하여 글마디(`posts`)와 각 유저가 좋아요 표시한 글마디(`likes`)를 관리하기 위해, 아래와 같은 데이터 구조를 설계했습니다.

```js
posts: {
  id: {		// 글마디 id (POST 요청으로 글마디 추가 시 자동으로 생성됨)
    type,	// 종류 (책/노래)
    author,	// 작가 이름
    body,	// 내용
    reference,	// 책 또는 노래 제목
    timestamp,	// 글마디 생성시각
    uid,	// 유저 id
    likesNum,	// 좋아요 수
    tags, 	// 태그 목록
  }
},

likes: {
  uid: {
    favoritePosts,	// 유저가 좋아요 표시한 글마디 id 목록
  }
}
```

- Realtime DB에게 데이터 CRUD(읽기, 쓰기, 수정, 삭제)를 요청할 방법으로 `REST API`를 활용하였습니다. 데이터 로드 및 가공을 담당하는 `model.js`에게 반복하여 재사용 가능한 AJAX 요청 함수를 제공하기 위해 주어진 url과 type의 REST 요청을 전달하고 결과를 리턴하는 메서드를 작성했습니다.

```js
> helpers.js

/**
 * @description 주어진 url에 주어진 type의 REST 요청을 전달
 * @param { String } url
 * @param { String } type : AJAX 요청 타입 (GET | POST | PUT | PATCH | DELETE)
 * @param { String | Object} uploadData
 * @returns response data
 */
export const AJAX = async function (url, type, uploadData = undefined) {
  try {
    // uploadData가 json raw string이면 그대로 전달
    // 객체이면 json string으로 변환 후 전달
    const fetchPro = fetch(url, {
      method: type,
      headers: { "Content-Type": "application/json" },
      body: uploadData
        ? typeof uploadData === "string"
          ? uploadData
          : JSON.stringify(uploadData)
        : null,
    });

    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);

    if (!res.ok) {
      throw new Error(`AJAX 오류 발생 (${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
```

- `model.js`는 `postController.js`로부터 글마디 로드/추가/수정/삭제, 좋아요 표시/제거 요청을 받고 각각의 요청을 처리하기 위해 Realtime DB `Endpoint`를 AJAX 메서드에 전달하도록 구현했습니다.

  ```js
  > config.js

  export const API_URL_POSTS =
  "https://geulmadi-default-rtdb.firebaseio.com/posts";
  export const API_URL_LIKES =
  "https://geulmadi-default-rtdb.firebaseio.com/likes";
  ```

  |            요청 내용             |                           엔드포인트                           | method |
  | :------------------------------: | :------------------------------------------------------------: | :----: |
  |         전체 글마디 로드         |                     {$API_URL_POSTS}.json                      |  GET   |
  |         단일 글마디 로드         |                {$API_URL_POSTS}/{$postId}.json                 |  GET   |
  |           글마디 추가            |              {$API_URL_POSTS}.json?auth={$token}               |  POST  |
  |           글마디 수정            |         {$API_URL_POSTS}/{$postId}.json?auth={$token}          | PATCH  |
  |           글마디 삭제            |         {$API_URL_POSTS}/{$postId}.json?auth={$token}          | DELETE |
  |           좋아요 추가            |      {$API_URL_LIKES}/{$uid}/favorites.json?auth={$token}      | PATCH  |
  |           좋아요 취소            | {$API_URL_LIKES}/{$uid}/favorites/{$postId}.json?auth={$token} | DELETE |
  |     글마디 좋아요 개수 읽기      |            {$API_URL_POSTS}/{$postId}/likesNum.json            |  GET   |
  |   글마디 좋아요 개수 업데이트    |         {$API_URL_POSTS}/{$postId}.json?auth={$token}          | PATCH  |
  | 유저가 좋아요한 글마디 목록 로드 |             {$API_URL_LIKES}/{$uid}/favorites.json             |  GET   |
  |          내 글마디 로드          |    {$API_URL_POSTS}.json?orderBy="{$uid}"&equalTo="{$uid}"     |  GET   |

<br />

#### ③ 카테고리 및 검색 기능 (hashchange 이벤트)

> 구현과정 회고 ➡️
> [[글마디 프로젝트] 카테고리, 검색 기능 구현 회고](https://velog.io/@minsuhan1/%EA%B8%80%EB%A7%88%EB%94%94-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC-%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84-%ED%9A%8C%EA%B3%A0)

![카테고리](https://github.com/minsuhan1/JavaScript_course_2022/assets/50696567/8976edbb-8231-4257-9e21-1fb1b9c73089)

![검색](https://github.com/minsuhan1/JavaScript_course_2022/assets/50696567/4f0dedf7-32e5-42f4-b46f-18e140c8e834)

- 유저가 임의의 카테고리를 클릭하면 url의 hash(#) 정보가 해당 카테고리 id로 설정되도록 `href` 값을 변경합니다. hash 변경을 `hashchange` 이벤트 리스너가 감지하면, 전체 페이지를 reload 하지 않고 글마디 리스트가 표시될 컨테이너에만 선택한 카테고리의 글마디를 로드하도록 구현했습니다.

- hashchange 이벤트를 `postListView.js`에서 감지한 다음, 바뀐 hash 값을 `postController.js`가 등록한 handler에 전달합니다. `postController.js`는 `hash`값에 따라 `model.js`에게 해당 카테고리에 맞게 글마디들을 가공해서 달라고 요청한 다음, 결과를 받아 `postListView.js`의 render 메서드에 전달하여 렌더링을 하게 합니다.

- 검색 기능 역시 비슷하게 구현했습니다. 유저가 글마디 본문, 제목, 작가, 태그 중 선택한 검색 기준과, 키워드를 가지고 주소의 hash 값을 `#search?type={$기준}&key={$키워드}`로 변경하면, `postController.js`가 hash값에서 검색기준과 키워드를 추출하여 `model.js`의 `loadSearchResults` 메서드를 호출하여 조건에 맞는 글마디를 검색해달라고 요청합니다.

```js
> postListView.js

addHandlerFilter(handler) {
  ['hashchange'].forEach(ev =>
    window.addEventListener(ev, () => {
      handler(location.hash);
    })
  );
}
```

```js
> postController.js

/**
 * @description 글마디 데이터를 불러와서 렌더링
 * @param { string } hash 주소창 hash값
 */
export const controlLoadPosts = async function (hash) {
  try {
    // ...
    let promise_load, data;
    if ((hash === "#recent") | !hash) {
      promise_load = model.loadPost("recent");
    }
    if (hash === "#trending") {
      promise_load = model.loadPost("trending");
    }
    if (hash === "#my") {
      promise_load = model.loadPost("my", uid);
    }
    if (hash === "#likes") {
      promise_load = model.loadPost("likes", uid, userFavorites);
    }
    if (hash.startsWith("#search")) {
      const query = decodeURI(hash); // 주소 한글 디코딩
      const type = query.slice(13, query.indexOf("&")); // 검색 기준
      const keyword = query.slice(query.lastIndexOf("=") + 1); // 키워드

      promise_load = model.loadSearchResults(type, keyword);
    }

    // ... 프로미스 실행 => 결과 수집 후 렌더링

  } catch (err) {
    // ...
  }
};

export const controlFilter = async function (hash) {
  await controlLoadPosts(hash);
};

postListView.addHandlerFilter(controlFilter);
```

<br />

#### ④ 글마디 카드 PNG 다운로드 및 공유 (html-to-image, blob, downloadjs, Web Share API)

> 구현과정 회고 ➡️
> [[글마디 프로젝트] 글마디 카드 PNG 다운로드 및 공유 기능 구현 회고](https://velog.io/@minsuhan1/%EA%B8%80%EB%A7%88%EB%94%94-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%80%EB%A7%88%EB%94%94-%EC%B9%B4%EB%93%9C-PNG-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EA%B3%B5%EC%9C%A0-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84-%ED%9A%8C%EA%B3%A0)

![Animation](https://github.com/minsuhan1/JavaScript_course_2022/assets/50696567/8e520f84-83f9-41dc-b4a8-7a170e813e85)

- 유저가 글마디 카드를 PNG 이미지 파일로 다운로드하는 기능과, 외부 애플리케이션으로 PNG 이미지 파일을 공유하는 기능을 구현했습니다.

- 이미지 다운로드 ➡️ `html-to-image` 라이브러리의 `toPng` 메서드를 사용하여 DOM 요소를 PNG 이미지 데이터로 변환한 다음, 이미지 dataUrl을 `downloadjs` 라이브러리의 `download` 메서드에 전달하여 디바이스에 PNG 이미지를 다운로드합니다.

```js
import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';

/* 이미지 다운로드 (html-to-image, downloadjs library) */
async #downloadImage() {
  document.querySelector('body').addEventListener('click', e => {
    if (e.target.closest('.download')) {
      // 카드 DOM을 png로 다운로드 (아이콘 제외)
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
```

- 이미지 외부 공유 ➡️ DOM 요소를 PNG 이미지 dataUrl로 변환한 다음 `blob` 메서드를 사용하여 blob 객체로 변환합니다. blob 객체를 가지고 `File` 객체를 생성하여 실제 파일로 변환한 후, `Web Share API`의 `navigator.share` 메서드를 사용하여 브라우저에서 해당 파일을 외부 애플리케이션으로 공유하는 네이티브 다이얼로그가 표시되도록 구현했습니다.

```js
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
```

<br />

#### ⑤ 모바일 반응형 UI 구현

> 구현과정 회고 ➡️
> [[글마디 프로젝트] 반응형 UI 구현 회고](https://velog.io/@minsuhan1/%EA%B8%80%EB%A7%88%EB%94%94-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%98%EC%9D%91%ED%98%95-UI-%EA%B5%AC%ED%98%84-%ED%9A%8C%EA%B3%A0)

![Animation](https://github.com/minsuhan1/JavaScript_course_2022/assets/50696567/997349f8-fb2f-455a-9651-1f7020a093ad)

- `media query`와 `@mixin`을 활용하여 태블릿 및 모바일 환경에 최적화된 레이아웃 및 사용자 UX를 구현하였습니다.

- 모바일 환경에서 글마디 목록이 길어질수록 유저가 다른 카테고리를 탐색하고 싶을 때 한참을 다시 위로 스크롤해야 하는 불편함이 없도록, `Intersection Observer API`를 활용하여 글마디 목록을 아래로 스크롤할 때 카테고리 내비게이션 바 (최신/인기/내 글마디/좋아요)가 화면 상단에 고정되도록 구현하였습니다.

<br />
