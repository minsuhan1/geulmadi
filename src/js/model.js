import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { AJAX } from "./helpers.js";

export const uploadPost = async function (formData, uid, token) {
  try {
    const uploadData = {
      type: formData[0],
      reference: formData[1],
      author: formData[2],
      body: formData[3],
      tags: formData[4].split(","),
      timestamp: new Date().getTime(),
      comments: [],
      likeUsers: [],
      uid: uid,
    };

    const ret = await AJAX(`${API_URL}?auth=${token}`, "POST", uploadData);
    return ret;
  } catch (err) {
    throw err;
  }
};
