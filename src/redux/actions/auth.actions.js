import * as types from "../constants/auth.constants";
import api from "../api";
import { useHistory } from "react-router-dom";
import { appActions } from "./app.actions";

const loginRequest = (email, password) => async (dispatch) => {
  dispatch(request());
  try {
    const history = useHistory();
    const res = await api.post("/user/login", { email, password });

    dispatch(appActions.setToken(res.data.token));
    dispatch(appActions.setUser(res.data.data));
    dispatch(success());

    history.push("/");
  } catch (error) {
    dispatch(failure(error));
  }

  function request() {
    return { type: types.LOGIN_REQUEST, payload: null };
  }
  function success() {
    return { type: types.LOGIN_SUCCESS, payload: null };
  }
  function failure(error) {
    return { type: types.LOGIN_FAILURE, payload: error };
  }
};

const register = (formData) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await api.post("/user/register", formData);

    dispatch(appActions.setToken(res.data.token));
    dispatch(appActions.setUser(res.data.data));
    dispatch(success());

    history.push("/");
  } catch (error) {
    dispatch(failure(error));
  }

  function request() {
    return { type: types.REGISTER_REQUEST, payload: null };
  }
  function success() {
    return { type: types.REGISTER_SUCCESS, payload: null };
  }
  function failure(error) {
    return { type: types.REGISTER_FAILURE, payload: error };
  }
};

export const authActions = {
  loginRequest,
  register,
};
