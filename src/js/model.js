import { async } from "regenerator-runtime";
import { API_URL_POSTS } from "./config.js";
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
      `${API_URL_POSTS}?auth=${token}`,
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
    const ret = await AJAX(`${API_URL_POSTS}`, "GET");
    return ret;
  } catch (err) {
    throw err;
  }
};
