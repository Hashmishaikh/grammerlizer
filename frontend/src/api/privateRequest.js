import axios from "axios";
import { baseURL } from "./baseUrl";

axios.defaults.withCredentials = true;
export const privateRequest = axios.create({
  timeout: 200000,
  baseURL: baseURL,
});
const getToken = () => {
  if (sessionStorage.getItem("authUser")) {
    return JSON.parse(sessionStorage.getItem("authUser")).token;
  }
};

// console.log("privateRequest----", privateRequest);
// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  // console.log('request', request)
  request.headers.Authorization = `Bearer ${getToken()}`;
  // request.headers("Access-Control-Allow-Origin", "*");

  // `${request.headers.Access-Control-Allow-Origin}` , `*`
  //   Access-Control-Allow-Methods = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  return request;
};

const responseHandler = (response) => {
  //   console.log("responsed", response);
  response.headers["content-type"] = "application/json";
  response.headers["access-control-allow-headers"] = "*";
  response.headers["access-control-allow-origin"] = "*";
  response.headers["allow"] = " GET, POST, PUT, HEAD, OPTIONS";
  response.headers["content-length"] = 360;
  response.headers["referrer-policy"] = "same-origin";
  return response;
};

const errorHandler = (error) => {
  // if (error.response.status === 401) {
  //     window.location = '/';
  //     sessionStorage.removeItem("authUser")
  // }
  // showErrorNotification(error.response.data.message)
  return Promise.reject(error);
};
// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
privateRequest.interceptors.request.use(
  (request) => requestHandler(request),
  // (response) => responseHandler(response),
  (error) => errorHandler(error)
);

privateRequest.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
