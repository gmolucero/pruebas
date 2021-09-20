import request from "./index";

export const login = async function (user) {
  return request({
    method: "POST",
    data: user,
    url: `/login`,
  });
};

//get link to change the password
export const changePassword = async function (user) {
  return request({
    method: "POST",
    data: user,
    url: `/changePassword`,
  });
};

export const resetPassword = async function (user) {
  return request({
    method: "POST",
    data: user,
    url: `/resetPasword`,
  });
};

export const register = async function (user) {
  return request({
    method: "POST",
    data: user,
    url: `/register`,
  });
};

export default {
  login,
};
