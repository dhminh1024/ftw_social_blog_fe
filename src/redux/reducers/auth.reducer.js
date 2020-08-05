import * as types from "../constants/auth.constants";
const initialState = {};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // case types.SOMETHING:
    //   return Object.assign({}, state, payload);
    default:
      return state;
  }
};

export default authReducer;
