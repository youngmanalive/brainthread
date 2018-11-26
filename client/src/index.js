import React from "react";
import ReactDOM from "react-dom";

import configureStore from "./js/store/store";
import { setSession } from "./js/util/user_api_util";

import "font-awesome/css/font-awesome.min.css";
import "./css/styles.scss";

import App from "./app";

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();

  if (localStorage.jwtToken) store.dispatch(setSession());

  ReactDOM.render(<App store={store}/>, document.getElementById("root"));
});
