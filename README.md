# 🌈 Toy Project : 글마디

### ▪️ 프로젝트 소개

> 책이나 노래에서 발견한 인상적인 문구나 가사를 기록하고, 서로 공유하는 웹서비스입니다.
> ‘글마디’는 글 구절의 순우리말입니다.

### ▪️ 프로젝트 기간(약 n일)

- 2023.04.05 ~

<!-->

### ▪️ 프로젝트 개요

- [DEMO](https://603ce6b8d579f1f8067c72df--teta-cardmaker.netlify.app/)
- [velog 프로젝트 회고](https://velog.io/@ichbinmin2/Toy-Project-Tetas-Card-Maker)

### ▪️ 기술 스택

- ReactJS / React-Hooks / PostCss
- Firebase / Cloudinary
- JavaScript(ES6) / HTML

### ▪️ 진행 도구

- Notion (프로젝트 기능 구현 계획과 일정 관리)
  <img width="854" alt="스크린샷 2021-03-01 오후 11 03 23" src="https://user-images.githubusercontent.com/53133662/109507774-6aec4a00-7ae2-11eb-9ee7-3c1253dbe103.png">

- Git + [GitHub](https://github.com/ichbinmin2/teta_CardMaker)

## ▪️ 🧩 디렉터리 구조

```bash
src
├── app.jsx
├── app.module.css
├── common
│   ├── colors.css
│   ├── reset.css
│   └── size.css
├── components
│   ├── button
│   │   ├── button.jsx
│   │   └── button.module.css
│   ├── card-add
│   │   ├── card-add.jsx
│   │   └── card-add.module.css
│   ├── card-box
│   │   ├── card-box.jsx
│   │   └── card-box.module.css
│   ├── card-edit
│   │   ├── card-edit.jsx
│   │   └── card-edit.module.css
│   ├── card-editor
│   │   ├── card-editor.jsx
│   │   └── card-editor.module.css
│   ├── card-maker
│   │   ├── card-maker.jsx
│   │   └── card-maker.module.css
│   ├── card-preview
│   │   ├── card-preview.jsx
│   │   └── card-preview.module.css
│   ├── footer
│   │   ├── footer.jsx
│   │   └── footer.module.css
│   ├── image_input
│   │   ├── image_input.jsx
│   │   └── image_input.module.css
│   ├── login
│   │   ├── login.jsx
│   │   └── login.module.css
│   └── nav
│       ├── nav.jsx
│       └── nav.module.css
├── index.js
├── index.module.css
├── pages
│   ├── main.jsx
│   ├── main.module.css
│   ├── mainBoard.jsx
│   └── mainBoard.module.css
└── service
    ├── auth_service.js
    ├── card_repository.js
    ├── firebase.js
    └── image_uploader.js
```

<br />

### ▪️ 구현한 기능

- React-hooks, CSS(PostCSS) 사용
- Router를 사용한 페이지 이동 구현
- Firebase Authentication을 이용한 소셜 로그인 인증 구현
- Firebase realtime database를 사용한 카드 데이터 저장 관리
- Cloudinary 를 이용한 이미지 업로더 기능 구현
- Dependency Injection을 통한 API 보안 관리
- cursor 애니메이션 구현
- 도형 애니메이션 및 반응형 웹페이지 구현

<br />

### ▪️ 구현 기능 요약

#### 1) 소셜 로그인 (Firebase Authentication)

> 진행과정 참조 (회고)
> [TIL. Firebase를 이용한 소셜 로그인 구현(1)](https://velog.io/@ichbinmin2/TIL.-Firebase%EC%9D%98) > [TIL. Firebase를 이용한 소셜 로그인 구현(2)](https://velog.io/@ichbinmin2/TIL.-Firebase%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%842)

- Firebase Authentication 서비스를 이용한 구글, 깃허브 소셜 로그인을 구현했습니다. Firebase 를 Add 할 때 역시, 지난 토이 프로젝트에서 진행했던 것과 동일하게 Dependency Injection를 적극 활용하여 API 보안 관리를 진행하고자 .env 파일 안에서 API Key를 작성하고 전체적으로 firebase API를 받아오는 js 안에서 불러오도록 지정했습니다.

```jsx
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DPMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
export const firebaseDatabase = firebaseApp.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
```

- 그리고, 인증 서비스 기능만을 담당하는 auth_service.js를 만든 뒤 firebase에서 import해온 firebaseAuth, githubProvider, googleProvider 등으로 해당 auth service 내에서 class를 작성하고 각각의 용도에 맞는 (인증)서비스가 필요한 컴포넌트에서 받아오는 방식으로 구현했습니다.

![ezgif com-gif-maker - 2022-07-03T195727 001](https://user-images.githubusercontent.com/53133662/177036466-9163e6fe-16ca-4410-8602-52f2343cc911.gif)

```jsx
import { firebaseAuth, githubProvider, googleProvider } from "./firebase";

class AuthService {
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  userLogin(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return googleProvider;
      case "Github":
        return githubProvider;
      default:
        throw new Error(`not supported provider : ${providerName}`);
    }
  }
}

export default AuthService;
```

- 인증 서비스 기능만을 담당하는 `auth_service.js` 안에서 로그인 함수를 작성하고 `firebase.js` 에서 import 해온 firebaseAuth에 `getProvider`와 `signInWithPopup`(firebase)메소드를 사용하여 인증 서비스가 필요한 컴포넌트에서 해당 함수를 받아오는 방식으로 구현했습니다.
- Github와 Google 의 인증 서비스 API는 `switch` 문을 활용하여 각각의 인자가 case와 동일하면 그에 맞는 해당 소셜 인증 API 명령어로 받아올 수 있도록 설정해주었습니다.

![1](https://user-images.githubusercontent.com/53133662/124862315-1a38b080-dff0-11eb-9088-0597ca340622.gif)

- 로그인 유지 : `useEffect` 함수를 사용해서 `authService`를 받아올 때마다 `user`가 들어온(로그인을 한) 상태이면, 새로 페이지를 열었을 때에도 자동으로 로그인이 되도록 구현했습니다.
- 이 역시 인증 서비스 기능만을 담당하는 `auth_service.js`의 `class` 에서 `user`가 로그인이 되어있는 상태인지만을 확인하는 함수 로직에 `onAuthStateChanged`(firebase)메소드 함수를 활용하여 조건식을 통해 로그인 정보가 필요한 컴포넌트에 `id` 값을 넣어주었습니다.
- 로그아웃 : firebase.js(firebase API)에서 import 해온 firebaseAuth에 signOut(firebase)메소드 함수를 사용하여 로그아웃 서비스가 필요한 컴포넌트에서 해당 함수를 받아오는 방식으로 구현했습니다.

<br />

#### 2) 카드 메이커 : 실시간 정보 입력

![8](https://user-images.githubusercontent.com/53133662/124868090-37727c80-dffa-11eb-8c51-f1db2d2f3077.gif)

- 해당 폼을 입력하는 태그마다 `useRef()` 를 설정해준 뒤, `event.current.target`이 업데이트 될 때마다 해당 card의 `name` 값을 `value` 값으로 업데이트 할 수 있도록 함수를 작성해주었습니다.
- 상위 컴포넌트의 콜백 함수 내에서 `delete` 명령어를 사용하고, 해당 폼을 입력하는 컴포넌트에 `props` 로 함수를 보내 delete 버튼을 누르면 입력 폼 카드가 삭제되는 기능을 구현하였습니다.

<br />

#### 3) 카드 메이커 (이미지 업로드 서비스 Cloudinary)

> 진행과정 참조 (회고)
> [TIL. Cloudinary를 사용한 이미지 업로딩(1)](https://velog.io/@ichbinmin2/TIL.-Cloudinary%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%94%A91) > [TIL. Cloudinary를 사용한 이미지 업로딩(2)](https://velog.io/@ichbinmin2/TIL.-Cloudinary%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%94%A92-8k4iowy1)

![9](https://user-images.githubusercontent.com/53133662/124868194-625cd080-dffa-11eb-93a4-e1dc59d10b7a.gif)

- Cloudinary를 적극 활용하여, 이미지 업로딩을 구현했습니다.

```jsx
const url = process.env.REACT_APP_CLOUDINARY_API_KEY;
const name = process.env.REACT_APP_CLOUDINARY_PROJECT_NAME;

class ImageUploader {
  async imageUpload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", `${name}`);

    const result = await fetch(`${url}`, {
      method: "POST",
      body: data,
    });
    return await result.json();
  }
}

export default ImageUploader;
```

- 이미지 업로더 기능만을 담당하는 `image_uploader.js` 안에서 `class` 를 만든뒤, 이미지 업로더 서비스가 필요한 컴포넌트에서 해당 함수를 받아오는 방식으로 구현했습니다.
- 이벤트 함수와 조건식을 활용하여 css로 로딩스피너를 구현하였습니다.

<br />

#### 4) 카드 메이커 페이지 (Firebase Realtime database)

> 진행과정 참조 (회고)
> [TIL. Firebase를 이용한 실시간 데이터 베이스 구현](https://velog.io/@ichbinmin2/TIL.-Firebase%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EA%B5%AC%ED%98%84)

![5](https://user-images.githubusercontent.com/53133662/124866444-65a28d00-dff7-11eb-9c84-a80475159b95.gif)

- firebase의 실시간 데이터베이스 서비스를 이용한 카드 메이커 페이지입니다.

```jsx
import { firebaseDatabase } from "./firebase";

class CardRepository {
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }

  saveCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }

  removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
```

- 실시간 데이터 서비스 기능만을 담당하는 `card_repository.js` 안에서 `class` 를 만든뒤, 로그인 함수를 작성하고 `set`와 `remove`(firebase)메소드를 사용하여 실시간 데이터 서비스가 필요한 컴포넌트에서 해당 함수를 받아오는 방식으로 데이터 저장/삭제 기능을 구현했습니다.

<br />

#### 5) 카드 메이커 페이지 (Router 페이지 이동 기능 구현)

![6](https://user-images.githubusercontent.com/53133662/124866739-da75c700-dff7-11eb-872b-39bb4061215b.gif)

- Router와 useHistory()함수를 사용하여, 페이지를 이동하게 하였습니다.

```jsx
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/board">
          <MainBoard
            authService={authService}
            FileInput={FileInput}
            cardRepository={cardRepository}
          />
        </Route>
```

<br />

#### 6) 반응형 웹페이지 구현 및 애니메이션 구현

![7](https://user-images.githubusercontent.com/53133662/124866830-fc6f4980-dff7-11eb-9592-6e6b1cc96207.gif)

- @media screen 을 이용하여 반응형 사이트를 구현했습니다.

<br />
