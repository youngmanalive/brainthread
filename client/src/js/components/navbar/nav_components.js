import React from "react";
import { NavLink } from "react-router-dom";


// Logged in view
export const MemberNav = ({ openMenu, user }) => (
  <ul className="nav-user animated fadeIn">
    <li><span className="nav-handle">{user}</span></li>
    <li><i className="fa fa-bars menu" onClick={openMenu} /></li>
  </ul>
);


// Non-member or logged out view
export const VisitorNav = () => (
  <ul className="nav-visitor animated fadeIn">
    <li><NavLink to="/login">Login</NavLink></li>
    <li><NavLink to="/register">Register</NavLink></li>
  </ul>
);


// Side-menu (visible only when logged in)
export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showBackdrop: false }
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  componentDidUpdate() {
    // timeouts assist in transitions for 'display none' on backdrop
    if (this.props.isActive && !this.state.showBackdrop) {
      setTimeout(() => this.setState({ showBackdrop: true }), 0);
    } else if (!this.props.isActive && this.state.showBackdrop) {
      setTimeout(() => this.setState({ showBackdrop: false }), 500);
    }
  }

  handleLogout() {
    this.props.closeMenu();
    setTimeout(this.props.logout, 500);
  }

  handleBackdrop() {
    const { isActive, closeMenu } = this.props;
    const onClick = isActive ? closeMenu : null;
    
    let fade, bdClass = "side-menu-backdrop";

    if (isActive && this.state.showBackdrop) fade = " show";
    else if (!isActive && !this.state.showBackdrop) fade = " hide";

    if (fade) bdClass += fade;

    return <div className={`${bdClass}`} onClick={onClick} />;
  }
  
  render() {
    const { isActive, closeMenu, loggedIn } = this.props;

    if (!loggedIn) return null;

    const status = isActive ? "show-menu" : "hide-menu";
    const backdrop = this.handleBackdrop();

    return (
      <>
        {backdrop}
        <div className={`side-menu ${status}`}>
          <i className="side-menu-close fa fa-times-circle" onClick={closeMenu} />

          <ul className="side-menu-links">
            <li>Thoughts</li>
            <li>Toolkit</li>
            <li>Groups</li>
            <li>Account</li>
            <li>About</li>
            <li>
              <button className="side-menu-logout" onClick={this.handleLogout}>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  }
}