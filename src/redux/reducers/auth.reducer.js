import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: false,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };

    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: { ...payload.data },
        loading: false,
        isAuthenticated: true,
        accessToken: payload.accessToken,
      };

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        redirectTo: "/login",
      };

    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false };

    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
