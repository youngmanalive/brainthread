import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ProtectedRoute } from "../util/route_util";

import ActivityMonitor from "../util/activity_monitor";
import LoginForm from "./session/login_form_container";
import RegisterForm from "./session/register_form_container";
import Home from "./home/home_container";
import Test from "./home/test";
import NavBar from "./navbar/navbar_container";
import Main from "./home/main";

const Root = () => (
  <>
    <ActivityMonitor />
    <Route path="/" component={NavBar} />

    <section className="main-content-container">
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/:test" component={Test} />
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </section>
  </>
);

export default Root;