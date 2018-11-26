import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentUser } from "../../util/user_api_util";

class Test extends React.Component {
  render() {
    return (
      <>
        <h1>You made it, {this.props.username}!</h1>
        <p>
          Clicking <button 
                      onClick={() => this.props.getCurrentUser()}
                      >HERE</button> will
          make an authorized get request. See console.
        </p>
        <Link to="/home">Home</Link>
      </>
    )
  }
}

const msp = state => ({ username: state.session.username });
const mdp = dispatch => ({ getCurrentUser: () => dispatch(getCurrentUser())});

export default connect(msp, mdp)(Test);