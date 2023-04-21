import { async } from "regenerator-runtime";
import { API_URL_LIKES, API_URL_POSTS } from "./config.js";
import { AJAX } from "./helpers.js";

/**
 * @description 글마디 업로드
 * @param { Object } formData
 * @param { string } uid
 * @param { string } token
 * @returns { Object } response data
 */
export const uploadPost = async function (formData, uid, token) {
  try {
    const uploadData = {
      type: formData[0],
      reference: formData[1],
      author: formData[2],
      body: formData[3].replaceAll("\n", "<br>"),
      tags: formData[4].split(","),
      timestamp: new Date().getTime(),
      likesNum: 0,
      uid: uid,
    };

    const ret = await AJAX(
      `${API_URL_POSTS}.json?auth=${token}`,
      "POST",
      uploadData
    );
    return ret;
  } catch (err) {
    throw err;
  }
};

/**
 * @description 글마디 불러오기
 * @returns response data
 */
export const loadRecentPost = async function () {
  try {
    const ret = await AJAX(`${API_URL_POSTS}.json`, "GET");
    return ret;
  } catch (err) {
    throw err;
  }
};

/**
 * @description 좋아요 여부 DB 반영
 * @returns response data
 */
export const saveLike = async function (postId, uid, type, token) {
  try {
    // 좋아요
    if (type === "on") {
      // 좋아요한 글마디 ID 추가
      await AJAX(
        `${API_URL_LIKES}/${uid}/favorites.json?auth=${token}`,
        "PATCH",
        `{"${postId}": { "time": "${new Date().getTime()}" }}`
      );

      // 좋아요 개수 업데이트
      const likesNum = await AJAX(
        `${API_URL_POSTS}/${postId}/likesNum.json`,
        "GET"
      );
      await AJAX(`${API_URL_POSTS}/${postId}.json?auth=${token}`, "PATCH", {
        likesNum: +likesNum + 1,
      });
    }

    // 좋아요 취소
    if (type === "off") {
      // 좋아요한 글마디 ID 제거
      await AJAX(
        `${API_URL_LIKES}/${uid}/favorites/${postId}.json?auth=${token}`,
        "DELETE"
      );

      // 좋아요 개수 업데이트
      const likesNum = await AJAX(
        `${API_URL_POSTS}/${postId}/likesNum.json`,
        "GET"
      );
      await AJAX(`${API_URL_POSTS}/${postId}.json?auth=${token}`, "PATCH", {
        likesNum: +likesNum - 1,
      });
    }
  } catch (err) {
    throw err;
  }
};

/**
 * @description 유저가 좋아요한 글마디 id 불러오기
 * @returns 글마디 id 배열
 */
export const loadUserFavorites = async function (uid) {
  try {
    const ret = await AJAX(`${API_URL_LIKES}/${uid}/favorites.json`, "GET");
    return ret ? [...Object.keys(ret)] : null;
  } catch (err) {
    throw err;
  }
};
