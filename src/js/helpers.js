import { TIMEOUT_SEC } from "./config.js";

// 타이머 함수
const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("요청시간이 초과하였습니다 (TIMEOUT)"));
    }, s * 1000);
  });
};

/**
 * @description 주어진 url에 주어진 type의 REST 요청을 전달
 * @param { String } url
 * @param { String } type : AJAX 요청 타입 (GET | POST | PUT | PATCH | DELETE)
 * @param { String | Object} uploadData
 * @returns response data
 */
export const AJAX = async function (url, type, uploadData = undefined) {
  try {
    // uploadData가 json raw string이면 그대로 전달
    // 객체이면 json string으로 변환 후 전달
    const fetchPro = fetch(url, {
      method: type,
      headers: { "Content-Type": "application/json" },
      body: uploadData
        ? typeof uploadData === "string"
          ? uploadData
          : JSON.stringify(uploadData)
        : null,
    });

    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);

    if (!res.ok) {
      throw new Error(`AJAX 오류 발생 (${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
