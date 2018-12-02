import React from "react";
import ReactDOM from "react-dom";

import configureStore from "./js/store/store";
import { handleSession } from "./js/actions/session_actions";

import "font-awesome/css/font-awesome.min.css";
import "./css/index.scss";

import App from "./app";

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();

  if (localStorage.jwtToken) store.dispatch(handleSession());

  ReactDOM.render(<App store={store}/>, document.getElementById("root"));
});
