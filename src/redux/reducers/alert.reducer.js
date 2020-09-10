import * as types from "../constants/alert.constants";
const initialState = [
  // { msg: "hello", alertType: "danger", id: "testing" }
];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_ALERT:
      return [...state, payload];
    case types.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
