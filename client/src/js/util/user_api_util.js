import axios from "axios";
import jwt_decode from "jwt-decode";

// SET AUTHORIZATION TOKEN
const setAuthToken = token => {
  axios.defaults.headers.common.Authorization = token ? token : null;
};


// REGISTER USER
export const createUser = user =>
  axios.post("/api/users/register", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      return decoded
    })
    .catch(err => {
      throw err.response.data 
    });


// LOGIN USER
export const createSession = credentials =>
  axios.post("/api/users/login", credentials)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      return decoded;
    })
    .catch( err => {
      throw err.response.data;
    });


// LOGOUT USER
export const destroySession = () => new Promise(resolve => {
  localStorage.removeItem("jwtToken");
  setAuthToken();
  resolve();
})


// GET CURRENT USER - jwt testing route
export const getCurrentUser = () =>
  axios.get("/api/users/current")
    .then(res => console.log(res.data))
    .catch(err => console.log(err));


// CHECK USERNAME
export const getUsername = name =>
  axios.get(`/api/users/username?username=${name}`)
    .then(res => res.data);


// HANDLE SESSION ON PAGE LOAD OR REFRESH
export const setSession = () => {
  const decoded = jwt_decode(localStorage.jwtToken);
  const expired = decoded.exp < (Date.now() / 1000);
  
  if (expired) localStorage.removeItem("jwtToken");
  
  setAuthToken(expired ? null : localStorage.jwtToken);
  return Promise.resolve(expired ? {} : decoded);
}