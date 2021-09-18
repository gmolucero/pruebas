import request from "./index";

const login = async function (user) {
  return request({
    method: "POST",
    data: user,
    url: `/login`,
  });
};

export default {
  login,
};
