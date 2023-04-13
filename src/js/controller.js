"use strict";

import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import auth from "./auth.js";

if (module.hot) {
  module.hot.accept();
}

/**
 *
 * @param { Array } formData registerView가 제공하는 form data
 * @description 회원가입 폼으로부터 입력받은 데이터를 auth.js에 정의된 Firebase 기반 회원가입 함수에 전달하여 회원가입을 진행함
 *
 */
const controlCreateAccount = async function (formData) {
  try {
    const data = await auth.signUpEmail(formData[0], formData[1]);
    registerView.renderSuccessMessage("회원가입이 완료되었습니다.");
    registerView.closeModal();
  } catch (err) {
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
    const data = await auth.signInEmail(formData[0], formData[1]);
    loginView.renderSuccessMessage("로그인 성공");
    loginView.closeModal();
  } catch (err) {
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

/* 로그아웃 버튼 클릭 이벤트 핸들러 */
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
  console.log("state changed", user);

  /* 로그인 상태에 따라 로그아웃/로그인 버튼 중 하나를 렌더링 */
  loginView.clearHeaderButtons();
  if (user) {
    loginView.showNavLogOutButton();
  } else {
    loginView.showNavLoginButton();
  }
};

/**
 * @description View / Auth 측에서 감지한 각 이벤트들에 대해 핸들러를 구독발행하는 메서드
 */
const init = function () {
  auth.onUserStateChange(controlUserStateChange);
  registerView.addHandlerCreateAccount(controlCreateAccount);
  loginView.addHandlerSignIn(controlSignIn);
  loginView.addHandlerSignOut(controlSignOut);
};

init();
