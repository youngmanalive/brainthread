import React from "react";
import ReactDOM from "react-dom";

import jwt_decode from "jwt-decode";
import configureStore from "./js/store/store";
import * as APIUtil from "./js/util/user_api_util";

import "./css/styles.scss";
import App from "./app";

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();

  if (localStorage.jwtToken) {
    APIUtil.setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(APIUtil.setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(APIUtil.logoutUser());
      window.location.href = "/login";
    }
  }

  window.getState = store.getState;

  ReactDOM.render(<App store={store}/>, document.getElementById("root"));
});
