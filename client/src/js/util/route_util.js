import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={handleRedirect(props.location.pathname)} />
    )
  )} />
);

const handleRedirect = nextPath => ({
  pathname: "/login",
  state: {
    message: "* You must be logged in to do that. Please sign in.",
    nextPath
  }
});

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id)
});

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));