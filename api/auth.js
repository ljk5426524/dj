import { request } from "../utils/util";
import { baseUrl } from "../config";

export default {
  // login
  toLogin(data) {
    return request({
      url: `${baseUrl}api/auth/login`,
      data,
      method: "post",
      contentType: 'application/json'
    });
  },
  // logout
  logout(data) {
    return request({
      url: `${baseUrl}api/logout`,
      data,
      method: "post",
      contentType: 'application/json'
    });
  },
}