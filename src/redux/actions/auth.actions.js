import * as types from "../constants/auth.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const loginRequest = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login", { email, password });
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome ${name}`, "success"));
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const loginFacebookRequest = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_FACEBOOK_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/facebook", { access_token });
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome ${name}`, "success"));
    dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: res.data.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.LOGIN_FACEBOOK_FAILURE, payload: error });
  }
};

const loginGoogleRequest = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_GOOGLE_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/google", { access_token });
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome ${name}`, "success"));
    dispatch({ type: types.LOGIN_GOOGLE_SUCCESS, payload: res.data.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.LOGIN_GOOGLE_FAILURE, payload: error });
  }
};

const register = (name, email, password, avatarUrl) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password, avatarUrl });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    dispatch(alertActions.setAlert(`Welcome, ${name}`, "success"));
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const updateProfile = (name, avatarUrl) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE_REQUEST, payload: null });
  try {
    const res = await api.put("/users", { name, avatarUrl });
    dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_PROFILE_FAILURE, payload: error });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

export const authActions = {
  loginRequest,
  loginFacebookRequest,
  loginGoogleRequest,
  register,
  updateProfile,
  getCurrentUser,
  logout,
};
