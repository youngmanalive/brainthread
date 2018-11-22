import React from "react";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        password2: "",
      },
      checkingName: false,
      validInput: true,
      next: false
    }

    this.typingTimeout = null;
    this.handleUsername = this.handleUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.errors).length) this.props.clearErrors();
  }

  registerUsername() {
    const buttonDisabled = (this.state.checkingName) || !(
      this.props.validUsername &&
      this.state.validInput &&
      this.state.user.username.length > 3
    );

    const style = {display: "inline", marginRight: "15px"};

    return (
      <>
        <h2>Create your username</h2>
        <input
          style={style}
          type="text"
          onChange={this.handleUpdate('username')}
          onKeyUp={this.handleUsername}
          value={this.state.user.username} 
          placeholder="Username" />
        <h4 style={style}>{this.usernameStatus()}</h4>
        <br/>
        <br/>
        <button 
          onClick={() => this.setState({ next: true })}
          disabled={buttonDisabled}>
          Next
        </button>
      </>
    )
  }

  usernameStatus() {
    if (this.state.checkingName) {
      return <i className="fa fa-spinner fa-pulse" />;
    } else if (this.state.user.username.length < 4) {
      return null;
    } else if (!this.state.validInput) {
      return <i className="fa fa-times" style={{color: "red"}}> Invalid characters</i>;
    } else if (!this.props.validUsername) {
      return <i className="fa fa-times" style={{color: "red"}} />
    } else {
      return <i className="fa fa-check" style={{color: "green"}} />;
    }
  }

  handleUpdate(field) {
    if (field === "username") {
      return e => this.setState({
        user: {
          ...this.state.user,
          [field]: e.currentTarget.value.toLowerCase()
        },
        checkingName: e.currentTarget.value.length > 3,
        validInput: true
      })
    } else {
      return e => this.setState({ user: {
        ...this.state.user,
        [field]: e.currentTarget.value
      }});
    }
  }

  handleUsername() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);

    if (this.state.user.username.length && !/^[a-z0-9_]+$/.test(this.state.user.username)) {
      return this.setState({ validInput: false, checkingName: false });
    }

    if (this.state.checkingName) {
      this.typingTimeout = setTimeout(() => {
        new Promise(() => this.props.checkUsername(this.state.user.username))
          .then(setTimeout(() => (
            this.setState({ checkingName: false, validInput: true })
          ), 300));
      }, 700);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state.user);
    this.props.register(user);
  }

  registerUserInfo() {
    return (
      <>
        <h2>Almost done</h2>
        <h4>{this.state.user.username}</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text" 
            onChange={this.handleUpdate("firstName")} 
            value={this.state.user.firstName}
            placeholder="First Name" />
          <input
            type="text" 
            onChange={this.handleUpdate("lastName")} 
            value={this.state.user.lastName}
            placeholder="Last Name" />
          <input
            type="email" 
            onChange={this.handleUpdate("email")} 
            value={this.state.user.email}
            placeholder="Email" />
          <input
            type="text" 
            onChange={this.handleUpdate("password")} 
            value={this.state.user.password}
            placeholder="Password" />
          <input
            type="text" 
            onChange={this.handleUpdate("password2")} 
            value={this.state.user.password2}
            placeholder="Confirm Password" />
          <input
            type="submit"
            value="Register" />
        </form>
        <button onClick={() => this.setState({ next: false })}>
          Go back
        </button>
      </>
    )
  }

  render() {
    const form = this.state.next
      ? (this.registerUserInfo())
      : (this.registerUsername());
  
    return (
      <>
        <h1>Sign Up!</h1>
        {form}
      </>
    );
  }
}

export default RegisterForm;