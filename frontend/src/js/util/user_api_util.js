import axios from "axios";
import jwt_decode from "jwt-decode";

export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

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
  type: RECEIVE_CURRENT_USER,
  payload: decoded
});

// REGISTER USER
export const registerUser = userData => dispatch => {
  axios.post("/api/users/register")
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
  axios.post("/api/users/login")
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