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
    url: `/reset-password`,
  });
};

export const forgotPassword = async function (user) {
  return request({
    method: "POST",
    data: user,
    url: `/forgot-password`,
  });
};

export const register = async function (user) {
  return request({
    method: "POST",
    data: user,
    url: `/register`,
  });
};

export const editRegister = async function (user) {
  return request({
    method: "PATCH",
    data: user,
    url: `/user`,
  });
};

export const getUser = async function () {
  return request({
    method: "GET",
    url: `/user`,
  });
};

export default {
  login,
};
