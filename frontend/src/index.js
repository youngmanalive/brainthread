import React from "react";
import ReactDOM from "react-dom";

import jwt_decode from "jwt-decode";
import configureStore from "./js/store/store";

import "./css/styles.scss";
import App from "./app";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
