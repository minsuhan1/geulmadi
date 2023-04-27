"use strict";

import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import resetPasswordView from "./views/resetPasswordView.js";
import uploadView from "./views/uploadView.js";
import * as model from "./model.js";
import auth from "./auth.js";
import recentPostsView from "./views/recentPostsView.js";
import { setPersistence } from "firebase/auth";

if (module.hot) {
  module.hot.accept();
}

let uid;
let token;
let editPostId;

///////////// AUTH ///////////////
/**
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
 * @param { Object } userCredential user Firebase Auth 유저 객체
 * @description 로그인 상태 변경 감지 후 유저id, 토큰 등을 받고 헤더 렌더링
 */
const controlUserStateChange = async function (user) {
  console.log("user data: ", user);
  if (user) {
    uid = user.uid;
    token = await user.getIdToken();
  } else {
    uid = null;
    token = null;
  }
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
 * @param { Object } formData uploadView로부터 받은 formData
 * @description 업로드 폼 제출버튼 클릭 감지 시 업로드 작업을 실행할 핸들러
 */
const controlUpload = async function (formData) {
  try {
    uploadView.toggleButtonSpinner();

    // 업로드 요청(editPostId 존재여부에 따라 수정 또는 추가)
    if (editPostId) {
      // 글마디 수정 요청
      await model.uploadPost(formData, uid, token, editPostId);
    } else {
      // 글마디 추가 요청
      await model.uploadPost(formData, uid, token);
    }

    uploadView.toggleButtonSpinner();
    uploadView.renderSuccessMessage("글마디가 등록되었어요!");

    // 수정 후 editPostId 초기화
    setEditPostId(null);
    // 등록 창 닫고 최근 글마디 reload
    uploadView.closeModal();
    await controlLoadPosts("#recent");
  } catch (err) {
    uploadView.toggleButtonSpinner();
    uploadView.renderError("등록 중 오류가 발생했습니다.");
  }
};

/**
 * @description 글마디 데이터를 불러와서 렌더링
 * @param { string } hash 주소창 hash값
 */
const controlLoadPosts = async function (hash) {
  try {
    // 현재 글마디 리스트 컨테이너 초기화
    recentPostsView.clearList();

    // 글마디 데이터 불러오기 (MODEL)
    recentPostsView.toggleSpinner();

    // 유저가 좋아요한 글마디
    const userFavorites = await model.loadUserFavorites(uid);

    let data;
    if ((hash === "#recent") | !hash) {
      data = await model.loadPost("recent");
    }
    if (hash === "#trending") {
      data = await model.loadPost("trending");
    }
    if (hash === "#my") {
      data = await model.loadPost("my", uid);
    }
    if (hash === "#likes") {
      data = await model.loadPost("likes", uid, userFavorites);
    }

    // 글마디 렌더링 (VIEW)
    if (data) {
      recentPostsView.render(data, userFavorites, uid);
    }
    recentPostsView.toggleSpinner();
  } catch (err) {
    recentPostsView.toggleSpinner();
    recentPostsView.renderError(err);
  }
};

/**
 * @description 삭제 버튼 클릭시 기능
 * @param 삭제 버튼이 클릭된 글마디 id
 */
const controlDelete = async function (postId) {
  if (confirm("선택한 글마디가 삭제됩니다")) {
    try {
      // 글마디 삭제 요청
      await model.deletePost(postId, token);
      // 최근 글마디 reload
      await controlLoadPosts(location.hash);
    } catch (err) {
      recentPostsView.renderError(err);
    }
  }
};

/**
 * @description 수정 버튼 클릭시 기능
 * @param 수정 버튼이 클릭된 글마디 id
 */
const controlEdit = async function (postId) {
  try {
    // 수정될 postId를 저장
    // 실제 수정 작업은 controlUpload에서 editPostId가 존재하는지에 따라 진행
    setEditPostId(postId);
    // 수정할 글마디 데이터를 받아서 수정 창에 전달만 해주면 됨
    const postData = await model.loadSinglePost(postId);
    uploadView.openEditModal(postData);
  } catch (err) {
    uploadView.renderError(err);
  }
};

/**
 * @description 좋아요 버튼 클릭시 기능
 * @param 좋아요 버튼이 클릭된 글마디 id
 */
const controlLike = async function (postId, type) {
  try {
    // model에 좋아요 여부 반영 요청
    await model.saveLike(postId, uid, type, token);
  } catch (err) {
    recentPostsView.renderError(err);
  }
};

/**
 * @description 수정중인 포스트 id값 초기화
 * @param { string | null } id
 */
const setEditPostId = function (id) {
  editPostId = id;
};

///////////////// 글마디 FILTER 관련 /////////////////
/**
 * @description 필터 버튼 클릭시 주소창의 hash값을 글마디 로드 메서드에 전달
 * @param { string } hash 주소창 hash값
 */
const controlFilter = async function (hash) {
  await controlLoadPosts(hash);
};

///////////////////// INIT /////////////////////

/**
 * @description 로그인 정보 변경(새로고침 포함) 감지 시 Auth 정보 초기화
 * @param { Object } userCredential 유저 정보 객체
 */
const init = async function (user) {
  await controlUserStateChange(user);

  // 글마디 filtering 관련 handlers
  // 로그인 정보가 확인된 후에 실행되어야해서 여기 위치함
  recentPostsView.addHandlerFilter(controlFilter);

  controlLoadPosts(location.hash);
};

///////////////////// 실행 스크립트 /////////////////////

// 로그인 정보 불러오기
auth.onUserStateChange(init);

// 인증 관련 handlers 등록
registerView.addHandlerCreateAccount(controlCreateAccount);
loginView.addHandlerSignIn(controlSignIn);
loginView.addHandlerSignOut(controlSignOut);
loginView.addHandlerSignInWithGoogle(controlSignInWithGoogle);
resetPasswordView.addHandlerResetPassword(controlResetPassword);

// 글마디 CRUD 관련 handlers
uploadView.addHandlerUpload(controlUpload);
uploadView.addHandlerUploadModalClose(setEditPostId);
recentPostsView.addHandlerBtnLike(controlLike);
recentPostsView.addHandlerBtnDelete(controlDelete);
recentPostsView.addHandlerBtnEdit(controlEdit);
