import React from "react";
import { connect } from "react-redux";
import { checkUsername } from "../../util/user_api_util";

// THIS IS A TEST COMPONENT THAT WILL BE INTEGRATED INTO THE REGISTER FORM

// ALLOWS USERS TO SEE IF USERNAME ALREADY EXISTS AS THEY TYPE.
// QUERIES DB AFTER USER HAS STOPPED TYPING FOR 0.7 SECONDS.

class CheckUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      cheking: false
    }

    this.typingTimeout = null;
    this.handleUsername = this.handleUsername.bind(this);
  }

  componentDidUpdate() {
    console.log("hello");
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value.toLowerCase(),
      checking: e.currentTarget.value.length > 2
    });
  }

  handleUsername() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);

    if (this.state.checking) {
      this.typingTimeout = setTimeout(() => {
        new Promise(() => this.props.checkUsername(this.state.username))
          .then(setTimeout(() => this.setState({ checking: false }), 300));
      }, 700);
    }
  }

  status() {
    if (this.state.checking) {
      return "Checking name...";
    } else {
      return this.state.username.length < 3 
      ? "Too short"
      : this.props.isValid
      ? "Available" 
      : "Username already exists";
    }
  }

  render() {
    return (
      <>
        <br/>
        <h2 style={{display: "inline"}}>Check username</h2>
        <input style={{display: "inline", marginLeft: "10px"}}
          type="text"
          onChange={this.update('username')}
          onKeyUp={this.handleUsername}
          value={this.state.username}
          placeholder="username" />
        <h3 style={{display: "inline", marginLeft: "10px"}}>{this.status()}</h3>
      </>
    )
  }
}


const mapStateToProps = state => ({
  isValid: state.session.username
});

const mapDispatchtoProps = dispatch => ({
  checkUsername: username => dispatch(checkUsername(username))
});

export default connect(mapStateToProps, mapDispatchtoProps)(CheckUsername);