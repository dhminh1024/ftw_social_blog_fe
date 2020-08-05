import { v4 as uuidv4 } from "uuid";
import * as types from "../constants/alert.constants";

const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: types.SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () => dispatch({ type: types.REMOVE_ALERT, payload: id }),
    timeout
  );
};

export const alertActions = {
  setAlert,
};
