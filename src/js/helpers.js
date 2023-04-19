import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("요청시간이 초과하였습니다 (TIMEOUT)"));
    }, s * 1000);
  });
};

export const AJAX = async function (url, type, uploadData = undefined) {
  try {
    const fetchPro = fetch(url, {
      method: type,
      headers: { "Content-Type": "application/json" },
      body: uploadData ? JSON.stringify(uploadData) : null,
    });

    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);

    if (!res.ok) {
      throw new Error(`업로드 오류 발생 (${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
