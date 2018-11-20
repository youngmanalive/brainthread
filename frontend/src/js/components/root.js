import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import LoginForm from "./session/login_form_container";
import RegisterForm from "./session/register_form_container";
import Home from "./home/home_container";

const Root = () => (
  <>
    <h1>BrainThread</h1>
    <Switch>
      <Route exact path="/" render={() => (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )} />
      <Route path="/login" render={() => <Link to="/">Back</Link>} />
      <Route path="/register" render={() => <Link to="/">Back</Link>} />
    </Switch>

    <Switch>
      <AuthRoute path="/login" component={LoginForm} />
      <AuthRoute path="/register" component={RegisterForm} />
      <ProtectedRoute exact path="/home" component={Home} />
    </Switch>
  </>
);

export default Root;