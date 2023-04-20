"use strict";

import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import resetPasswordView from "./views/resetPasswordView.js";
import uploadView from "./views/uploadView.js";
import * as model from "./model.js";
import auth from "./auth.js";
import recentPostsView from "./views/recentPostsView.js";

if (module.hot) {
  module.hot.accept();
}

///////////// AUTH ///////////////
/**
 *
 * @param { Array } formData registerView가 제공하는 form data
 * @description 회원가입 폼으로부터 입력받은 데이터를 auth.js에 정의된 Firebase 기반 회원가입 함수에 전달하여 회원가입을 진행함
 *
 */
const controlCreateAccount = async function (formData) {
  try {
    // 로딩 스피너 표시
    registerView.toggleButtonSpinner();
    // Firebase 회원가입 인증 대기
    const data = await auth.signUpEmail(formData[0], formData[1]);
    // 인증 완료 메시지 표시
    registerView.renderSuccessMessage("회원가입이 완료되었습니다.");
    // 로딩 스피너 제거
    registerView.toggleButtonSpinner();
    // 회원가입 창 닫기
    registerView.closeModal();
  } catch (err) {
    // 로딩 스피너 제거
    registerView.toggleButtonSpinner();
    // 오류 코드에 따른 메시지 표시
    switch (err.code) {
      case "auth/email-already-in-use":
        registerView.renderError("이미 사용 중인 이메일입니다.");
        return;
      case "auth/weak-password":
        registerView.renderError("비밀번호는 6글자 이상이어야 합니다.");
        return;
      case "auth/network-request-failed":
        registerView.renderError("네트워크 연결에 실패하였습니다.");
        return;
      case "auth/invalid-email":
        registerView.renderError("잘못된 이메일 형식입니다.");
        return;
      case "auth/internal-error":
        registerView.renderError("잘못된 요청입니다.");
        return;
      default:
        registerView.renderError("회원가입에 실패 하였습니다.");
    }
  }
};

/**
 *
 * @param { Array } formData loginView가 제공하는 form data
 * @description 로그인 폼으로부터 입력받은 데이터를 auth.js에 정의된 Firebase 기반 로그인 함수에 전달하여 로그인을 진행함
 *
 */
const controlSignIn = async function (formData) {
  try {
    // 로딩 스피너 표시
    loginView.toggleButtonSpinner();
    // Firebase 로그인 인증 대기
    // formData[0]: Email, formData[1]: Password
    const data = await auth.signInEmail(formData[0], formData[1]);
    // 인증 완료 메시지 표시
    loginView.renderSuccessMessage("로그인 성공");
    // 로딩 스피너 제거
    loginView.toggleButtonSpinner();
    // 로그인 창 닫기
    loginView.closeModal();
  } catch (err) {
    // 로딩 스피너 제거
    loginView.toggleButtonSpinner();
    // 오류코드에 따른 메시지 표시
    switch (err.code) {
      case "auth/user-not-found" || "auth/wrong-password":
        loginView.renderError("이메일 혹은 비밀번호가 일치하지 않습니다.");
        return;
      case "auth/weak-password":
        loginView.renderError("비밀번호는 6글자 이상이어야 합니다.");
        return;
      case "auth/network-request-failed":
        loginView.renderError("네트워크 연결에 실패하였습니다.");
        return;
      case "auth/invalid-email":
        loginView.renderError("잘못된 이메일 형식입니다.");
        return;
      case "auth/internal-error":
        loginView.renderError("잘못된 요청입니다.");
        return;
      default:
        loginView.renderError("로그인에 실패하였습니다.");
    }
  }
};

/**
 *
 * @param { Array } formData loginView가 제공하는 form data
 * @description 로그인 폼으로부터 입력받은 데이터를 auth.js에 정의된 Firebase 기반 로그인 함수에 전달하여 로그인을 진행함
 *
 */
const controlSignInWithGoogle = async function (formData) {
  try {
    const data = await auth.signInGoogle();
    // 인증 완료 메시지 표시
    loginView.renderSuccessMessage("로그인 성공");
    // 로그인 창 닫기
    loginView.closeModal();
  } catch (err) {
    // 오류코드에 따른 메시지 표시
    switch (err.code) {
      case "auth/popup-closed-by-user":
        // 팝업창 닫은 경우는 따로 메시지 표시 X
        return;
      case "auth/network-request-failed":
        loginView.renderError("네트워크 연결에 실패하였습니다.");
        return;
      case "auth/internal-error":
        loginView.renderError("잘못된 요청입니다.");
        return;
      default:
        loginView.renderError("로그인에 실패하였습니다.");
    }
  }
};

/**
 *
 * @param { string } email resetPasswordView가 제공하는 email
 * @description 주어진 email을 auth.js에 정의된 Firebase 기반 비밀번호 재설정 함수에 전달
 *
 */
const controlResetPassword = async function (email) {
  try {
    // 로딩 스피너 표시
    resetPasswordView.toggleButtonSpinner();
    // 비밀번호 재설정 링크 전송
    const data = await auth.resetPassword(email);
    // 전송 완료 메시지 표시
    resetPasswordView.renderSuccessMessage(
      "비밀번호 재설정 링크를 보냈습니다. 메일을 확인하세요."
    );
    // 로딩 스피너 제거
    resetPasswordView.toggleButtonSpinner();
  } catch (err) {
    // 로딩 스피너 제거
    resetPasswordView.toggleButtonSpinner();
    // 오류코드에 따른 메시지 표시
    switch (err.code) {
      case "auth/user-not-found":
        resetPasswordView.renderError("존재하지 않는 계정입니다.");
        return;
      case "auth/network-request-failed":
        resetPasswordView.renderError("네트워크 연결에 실패하였습니다.");
        return;
      case "auth/internal-error":
        resetPasswordView.renderError("잘못된 요청입니다.");
        return;
      default:
        resetPasswordView.renderError("링크 전송에 실패하였습니다.");
    }
  }
};

/**
 * @description 로그아웃 버튼 클릭 이벤트 핸들러
 */
const controlSignOut = async function () {
  try {
    await auth.signOutUser();
    loginView.renderSuccessMessage("로그아웃되었습니다");
  } catch (err) {
    console.log(err);
    loginView.renderError("로그아웃 실패");
  }
};

/**
 *
 * @param { Object } user Firebase Auth 유저 객체
 * @description 로그인 상태 변경 감지 시 실행할 핸들러
 */
const controlUserStateChange = function (user) {
  console.log("user data: ", user);
  /* 로그인 상태에 따라 로그아웃/로그인 버튼 중 하나를 렌더링 */
  loginView.clearHeaderButtons();
  if (user) {
    loginView.showNavLogOutButton();
    loginView.showNavAccountButton(auth.getCurrentUserData().email);
  } else {
    loginView.showNavLoginButton();
  }
};

///////////// CRUD ///////////////
/**
 * @param { Object } uploadView로부터 받은 formData
 * @description 업로드 폼 제출버튼 클릭 감지 시 업로드 작업을 실행할 핸들러
 */
const controlUpload = async function (formData) {
  try {
    uploadView.toggleButtonSpinner();

    // 업로드 요청
    const uid = auth.getCurrentUserID();
    const token = await auth.getCurrentIdToken();
    const data = await model.uploadPost(formData, uid, token);

    uploadView.toggleButtonSpinner();
    uploadView.renderSuccessMessage("글마디가 등록되었어요!");
    console.log(data);

    // 등록 창 닫고 최근 글마디 reload
    uploadView.closeModal();
    controlLoadRecentPosts();
  } catch (err) {
    uploadView.toggleButtonSpinner();
    uploadView.renderError("등록 중 오류가 발생했습니다.");
  }
};

/**
 * @description 글마디 데이터를 불러와서 렌더링
 */
const controlLoadRecentPosts = async function () {
  try {
    // 글마디 데이터 불러오기 (MODEL)
    recentPostsView.toggleSpinner();
    const data = await model.loadRecentPost();
    recentPostsView.toggleSpinner();

    // 글마디 렌더링 (VIEW)
    if (data) recentPostsView.render(data);
  } catch (err) {
    recentPostsView.toggleSpinner();
    recentPostsView.renderError(err);
  }
};

/**
 * @description View / Auth 측에서 감지한 각 이벤트들에 대해 핸들러를 구독발행하는 메서드
 */
const init = function () {
  // 인증 관련 handlers
  auth.onUserStateChange(controlUserStateChange);
  registerView.addHandlerCreateAccount(controlCreateAccount);
  loginView.addHandlerSignIn(controlSignIn);
  loginView.addHandlerSignOut(controlSignOut);
  loginView.addHandlerSignInWithGoogle(controlSignInWithGoogle);
  resetPasswordView.addHandlerResetPassword(controlResetPassword);

  // 업로드 관련 handlers
  uploadView.addHandlerUpload(controlUpload);
  recentPostsView.addHandlerLoad(controlLoadRecentPosts);
};

init();
