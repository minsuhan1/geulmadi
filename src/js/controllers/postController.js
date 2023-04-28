"use strict";

import * as model from "../model/model.js";
import { uid, token } from "./loginController.js";
import uploadView from "../views/uploadView.js";
import postListView from "../views/postListView.js";
import searchView from "../views/searchView.js";

let editPostId;

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
export const controlLoadPosts = async function (hash) {
  try {
    // 현재 글마디 리스트 컨테이너 초기화
    postListView.clearList();

    // 글마디 데이터 불러오기 (MODEL)
    postListView.toggleSpinner();

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
      if (!uid) {
        postListView.renderInfoMessage("로그인이 필요합니다");
      } else {
        data = await model.loadPost("my", uid);
      }
    }
    if (hash === "#likes") {
      if (!uid) {
        postListView.renderInfoMessage("로그인이 필요합니다");
      } else {
        data = await model.loadPost("likes", uid, userFavorites);
      }
    }
    if (hash.startsWith("#search")) {
      const query = decodeURI(hash); // 주소 한글 디코딩
      const type = query.slice(13, query.indexOf("&")); // 검색 기준
      const keyword = query.slice(query.lastIndexOf("=") + 1); // 키워드

      data = await model.loadSearchResults(type, keyword);
    }

    // 글마디 렌더링 (VIEW)
    if (data.length > 0) {
      postListView.render(data, userFavorites, uid);
      postListView.toggleSpinner();
    } else {
      postListView.toggleSpinner();
      postListView.showEmptyBox();
    }
  } catch (err) {
    postListView.toggleSpinner();
    postListView.renderError(err);
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
      postListView.renderError(err);
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
    postListView.renderError(err);
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
export const controlFilter = async function (hash) {
  await controlLoadPosts(hash);
};

///////////////////// 실행 스크립트 /////////////////////

// 글마디 CRUD 관련 handlers
uploadView.addHandlerUpload(controlUpload);
uploadView.addHandlerUploadModalClose(setEditPostId);
postListView.addHandlerBtnLike(controlLike);
postListView.addHandlerBtnDelete(controlDelete);
postListView.addHandlerBtnEdit(controlEdit);
