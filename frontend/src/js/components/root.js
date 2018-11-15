import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import LoginFormContainer from "./session/login_form_container";
import HomeContainer from "./home/home_container";

const Root = () => (
  <>
    <h1>BrainThread</h1>
    <h1>Welcome!</h1>
    <Route exact path="/" render={() => <Link to="/login">Login</Link>} />
    <Route exact path="/login" render={() => <Link to="/">Back</Link>} />

    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <ProtectedRoute exact path="/home" component={HomeContainer} />
    </Switch>
  </>
);

export default Root;