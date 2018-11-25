import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Test extends React.Component {
  render() {
    return (
      <>
        <h1>You made it, {this.props.username}!</h1>
        <Link to="/home">Home</Link>
      </>
    )
  }
}

const msp = state => ({ username: state.session.username });

export default connect(msp)(Test);