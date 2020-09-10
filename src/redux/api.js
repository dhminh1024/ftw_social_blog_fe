import axios from "axios";
import store from "./store";
import { alertActions } from "./actions";

const api = axios.create({
  // baseURL: "https://social-api-cs.great.dev/",
  baseURL: process.env.REACT_APP_BACKEND_API + "api",
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    let errorMsg = error.message;
    if (error.errors && error.errors.message)
      errorMsg = errorMsg + ": " + error.errors.message;
    store.dispatch(alertActions.setAlert(errorMsg, "danger"));
    return Promise.reject(error);
  }
);

export default api;
