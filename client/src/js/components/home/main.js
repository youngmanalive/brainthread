import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NoMatch from "./no_match";

class Main extends React.Component {
  render() {
    const { loggedIn, location: { state } } = this.props;
    if (state && state.notFound) return <NoMatch {...this.props} param={state.param} />;

    console.log(loggedIn);
    
    const signup =
      <button className="mainpage-button">
        {loggedIn ? <Link to="/home">Home</Link> : <Link to="/register">Sign up</Link>}
      </button>;

    return (
      <div className="mainpage-container">
        <h1 className="mainpage-header">Welcome!</h1>
        <h2 className="mainpage-about">BrainThread is a sandbox to ponder and share your thoughts</h2>
        {signup}
      </div>
    )
  }
}

const msp = state => ({ loggedIn: Boolean(state.session.id) });


export default connect(msp)(Main);