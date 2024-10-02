import { api as request } from "boot/axios";
import handleError from "src/api/handleError.js";
import notify from "src/api/notify.js";

export const get = async function (url, obj = {}) {
  try {
    const data = await request.get(url, obj);
    if (data.data && data.data.success === true) {
      return Promise.resolve(data.data);
    } else {
      notify(data.message || "Something went wrong", "error");
    }
  } catch (error) {
    notify(
      "Something went wrong. May be you are not connected to internet.",
      "error"
    );
  }
};

export const api = function (
  method,
  url,
  data = {},
  params = {},
  headers = {
    "Content-Type": "Application/json",
  }
) {
  return request({
    method: method,
    url: url,
    data: data,
    params: params,
    headers: headers,
  }).catch(handleError);
};
