// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

class Auth {
  // Your web app's Firebase configuration
  #firebaseConfig = {
    apiKey: "AIzaSyAK1J0LTcCjLAc0cReDd9YT3aIMLvXJszI",
    authDomain: "geulmadi.firebaseapp.com",
    databaseURL: "https://geulmadi-default-rtdb.firebaseio.com",
    projectId: "geulmadi",
    storageBucket: "geulmadi.appspot.com",
    messagingSenderId: "413765648120",
    appId: "1:413765648120:web:cd715421fce4e669e9450d",
  };

  // Initialize Firebase
  #firebase_app = initializeApp(this.#firebaseConfig);
  #auth = getAuth(this.#firebase_app);
  #provider = new GoogleAuthProvider();

  /**
   * @description Google로 로그인
   * @returns { Object } userCredential
   */
  async signInGoogle() {
    try {
      const data = await signInWithPopup(this.#auth, this.#provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const token = credential.accessToken;

      return credential;
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @description 이메일/패스워드 기반 Firebase 계정 생성
   * @param { string } email
   * @param { string } password
   * @returns { Object } userCredential
   */
  async signUpEmail(email, password) {
    try {
      // ret data: (userCredential);
      const data = await createUserWithEmailAndPassword(
        this.#auth,
        email,
        password
      );
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @description 이메일/패스워드 기반 Firebase 로그인
   * @param { string } email
   * @param { string } password
   * @returns { Object } userCredential
   */
  async signInEmail(email, password) {
    try {
      // ret data: (userCredential);
      const data = await signInWithEmailAndPassword(
        this.#auth,
        email,
        password
      );
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @description 현재 Firebase 인증 User 로그아웃
   */
  async signOutUser() {
    try {
      await signOut(this.#auth);
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @description 비밀번호 재설정
   */
  async resetPassword(email) {
    try {
      const data = await sendPasswordResetEmail(this.#auth, email);
      return data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description 인증 정보 변경(로그인, 로그아웃 등)을 감지한 경우 Controller에서 실행할 함수 등록
   * @param { Function } handler
   */
  onUserStateChange(handler) {
    this.#auth.onAuthStateChanged((user) => {
      handler(user);
    });
  }

  /**
   * @description 현재 유저 정보 제공
   */
  getCurrentUserData() {
    return this.#auth.currentUser;
  }

  /**
   * @description 현재 유저 id 제공
   */
  getCurrentUserID() {
    return this.#auth.currentUser.uid;
  }

  /**
   * @description 현재 유저 id token 제공
   */
  async getCurrentIdToken() {
    try {
      const idToken = await this.#auth.currentUser.getIdToken();
      return idToken;
    } catch (err) {
      throw err;
    }
  }
}

export default new Auth();
