import React from "react";
import IdleTimer from "react-idle-timer";

import { logoutUser } from "../actions/session_actions";
import { connect } from "react-redux";


class ActivityMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onIdle = this._onIdle.bind(this);
  }

  render() {
    if (!this.props.loggedIn) return null;

    return (
      <IdleTimer
        ref={ref => { this.idleTimer = ref }}
        onIdle={this.onIdle}
        timeout={3600000} />
    );
  }
 
  _onIdle() {
    this.props.logout();
    setTimeout(() => alert("You have been logged out due to inactivity"));
  }
}

const mapStateToProps = state => ({ loggedIn: Boolean(state.session.id) });
const mapDispatchToProps = dispatch => ({ logout: () => dispatch(logoutUser())});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityMonitor);