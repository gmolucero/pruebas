import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_CLIENTE_API_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(response => response, function (error) {
  if (error.response.status === 401) {
    window.location.href = '/'
  }
  return Promise.reject(error);
});

const onSuccess = async function (response) {
  return response;
};

const onError = async function (error) {
  if (error.response) {
    return error.response;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('Error', error.message);
  }
  console.log(error.config);
  return error;
};

const request = async function (options) {
  let result = window.localStorage.getItem("token");

  if (result) {
    options.headers = { Authorization: `Bearer ${result}` };
  }
  return instance(options).then(onSuccess).catch(onError);
};

export default request;
