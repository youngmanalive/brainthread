import axios from "axios";
import jwt_decode from "jwt-decode";

export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CHECK_USERNAME = "CHECK_USERNAME";

// SET AUTHORIZATION TOKEN
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// SET CURRENT USER
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// REGISTER USER
export const registerUser = userData => dispatch => {
  axios.post("/api/users/register", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: RECEIVE_USER_ERRORS,
        payload: err.response.data
      })
    );
};

// LOGIN USER
export const loginUser = userData => dispatch => {
  axios.post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: RECEIVE_USER_ERRORS,
        payload: err.response.data
      })
    );
};

// LOGOUT USER
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken();
  dispatch(setCurrentUser({}));
}

// CHECK USERNAME
export const checkUsername = username => dispatch => {
  axios.get("/api/users/username", { params: { username } })
    .then(res => {
      dispatch({
        type: CHECK_USERNAME,
        payload: res.data
      });
    });
}