import React from "react";
import { NavLink } from "react-router-dom";
import { MemberNav, VisitorNav, Menu } from "./nav_components";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleLogout() {
    return new Promise(resolve => resolve(this.props.logout()))
      .then(this.props.history.push("/"));
  }

  handleMenu() {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  render() {
    const { loggedIn, user } = this.props;
    const sideMenu = (
      <Menu
        isActive={this.state.menuVisible}
        closeMenu={this.handleMenu}
        logout={this.handleLogout}
        loggedIn={loggedIn}
      />
    );
    const navUI = loggedIn
      ? <MemberNav user={user} openMenu={this.handleMenu} />
      : <VisitorNav />;

    return (
      <nav>
        {sideMenu}
        <div className="nav-main-container">
          <NavLink exact to="/" className="nav-logo">BrainThread</NavLink>
          {navUI}
        </div>
      </nav>
    );
  }
}

export default NavBar;
