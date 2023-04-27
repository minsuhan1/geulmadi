import { async } from "regenerator-runtime";
import { API_URL_LIKES, API_URL_POSTS } from "../config.js";
import { AJAX } from "../helpers.js";

/**
 * @description 글마디 업로드
 * @param { Object } formData
 * @param { string } uid
 * @param { string } token
 * @param { string } postId : 글마디 수정 요청 시 전달하는 글마디 id. null일 경우는 글마디 추가 요청임
 * @returns { Object } response data
 */
export const uploadPost = async function (formData, uid, token, postId = null) {
  try {
    // postId가 존재하면 수정 요청
    if (postId) {
      // 수정할 data
      const uploadData = {
        type: formData[0],
        reference: formData[1],
        author: formData[2],
        body: formData[3].replaceAll("\n", "<br>"),
        tags: formData[4].split(","),
      };

      // 수정(PATCH) 요청
      const ret = await AJAX(
        `${API_URL_POSTS}/${postId}.json?auth=${token}`,
        "PATCH",
        uploadData
      );
      return ret;
    } else {
      // 업로드할 data
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

      // 추가(POST) 요청
      const ret = await AJAX(
        `${API_URL_POSTS}.json?auth=${token}`,
        "POST",
        uploadData
      );
      return ret;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * @description 글마디 리스트 불러오기
 * @param { string } type recent | trending | my | likes
 * @param { string } uid 유저 id (default null)
 * @param { string[] } userFavorites 유저가 좋아요한 글마디 id 리스트 (default null)
 * @returns 글마디 리스트
 */
export const loadPost = async function (
  type = "recent",
  uid = null,
  userFavorites = null
) {
  try {
    let ret;
    if (type === "recent") {
      ret = await AJAX(`${API_URL_POSTS}.json`, "GET");
      // 최신순 정렬
      ret = Object.entries(ret).reverse();
    }
    if (type === "trending") {
      ret = await AJAX(`${API_URL_POSTS}.json`, "GET");
      // 좋아요순 정렬
      ret = Object.entries(ret).sort(function (a, b) {
        return b[1].likesNum - a[1].likesNum;
      });
    }
    if (type === "my") {
      ret = await AJAX(
        `${API_URL_POSTS}.json?orderBy="uid"&equalTo="${uid}"`,
        "GET"
      );
      // 최신순 정렬
      ret = Object.entries(ret).sort(function (a, b) {
        return b[1].timestamp - a[1].timestamp;
      });
    }
    if (type === "likes") {
      ret = await AJAX(`${API_URL_POSTS}.json`, "GET");
      // 좋아요한 글만 필터링
      ret = Object.entries(ret).filter((entry) =>
        userFavorites.includes(entry[0])
      );
      // 최신글순 정렬
      ret.reverse();
    }
    return ret;
  } catch (err) {
    throw err;
  }
};

/**
 * @description 해당 id 글마디 불러오기
 * @param { String } 글마디 id
 * @returns 단일 글마디 데이터
 */
export const loadSinglePost = async function (postId) {
  try {
    const ret = await AJAX(`${API_URL_POSTS}/${postId}.json`, "GET");
    return ret;
  } catch (err) {
    throw err;
  }
};

/**
 * @description 글마디 삭제하기
 * @param { string } postId : 글마디 id
 * @param { string } token : 유저 idToken
 * @returns response data
 */
export const deletePost = async function (postId, token) {
  try {
    const ret = await AJAX(
      `${API_URL_POSTS}/${postId}.json?auth=${token}`,
      "DELETE"
    );
    return ret;
  } catch (err) {
    throw err;
  }
};

/**
 * @description 좋아요 여부 DB 반영
 * @param { string } postId : 글마디 id
 * @param { string } uid : 유저 id
 * @param { string } type : 좋아요 추가: "on", 취소: "off"
 * @param { string } token : 유저 idToken
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
 * @param { String }  uid : 유저 id
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
