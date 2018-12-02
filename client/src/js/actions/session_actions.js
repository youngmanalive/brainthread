import * as APIUtil from "../util/user_api_util";

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CHECK_USERNAME = "CHECK_USERNAME";

const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

const receiveUserErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  payload: errors
});

const receieveUsername = data => ({
  type: CHECK_USERNAME,
  payload: data
});

export const registerUser = userData => dispatch =>
  APIUtil.createUser(userData)
    .then(user => dispatch(setCurrentUser(user)))
    .catch(err => dispatch(receiveUserErrors(err)));

export const loginUser = credentials => dispatch =>
  APIUtil.createSession(credentials)
    .then(user => dispatch(setCurrentUser(user)))
    .catch(err => dispatch(receiveUserErrors(err)));

export const logoutUser = () => dispatch =>
  APIUtil.destroySession()
    .then(() => dispatch(setCurrentUser({})));

export const handleSession = () => dispatch =>
  APIUtil.setSession()
    .then(user => dispatch(setCurrentUser(user)));

export const checkUsername = name => dispatch =>
  APIUtil.getUsername(name)
    .then(data => dispatch(receieveUsername(data)));