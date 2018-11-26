import React from "react";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    return new Promise(resolve => resolve(this.props.logout()))
      .then(this.props.history.push("/"));
  }

  render() {
    const { loggedIn, user } = this.props;

    return loggedIn ? (
      <>
        <h1>BrainThread</h1>
        <h2>Hello, {user}</h2>
        <button onClick={this.handleLogout}>Log out</button>
      </>
    ) : (
      <>
        <h1>BrainThread</h1>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </>
    );
  }
}

export default NavBar;