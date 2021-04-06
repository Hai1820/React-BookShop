import { LOGIN_REQUEST, SUCCESS, FAILURE, LOGOUT_REQUEST } from "./authTypes";

export const authenticateUser = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest());
    if (email === "test" && password === "test") {
      dispatch(success(true));
    } else {
      dispatch(failure(false));
    }
  };
};
const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(loginRequest());
    dispatch(success(false));
  };
};

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
const success = (isLoggedIn) => {
  return {
    type: SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = (isLoggedIn) => {
  return {
    type: FAILURE,
    payload: isLoggedIn,
  };
};
