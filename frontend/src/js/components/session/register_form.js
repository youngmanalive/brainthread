import React from "react";
import CheckUsername from './check_username';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      password2: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.errors).length) this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.register(user);
  }

  render() {
    return (
      <>
        <CheckUsername/>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign up!</h1>
          <input
            type="text" 
            onChange={this.update("firstName")} 
            value={this.state.firstName}
            placeholder="First Name" />
          <input
            type="text" 
            onChange={this.update("lastName")} 
            value={this.state.lastName}
            placeholder="Last Name" />
          <input
            type="text" 
            onChange={this.update("username")} 
            value={this.state.username}
            placeholder="Username" />
          <input
            type="text" 
            onChange={this.update("email")} 
            value={this.state.email}
            placeholder="Email" />
          <input
            type="text" 
            onChange={this.update("password")} 
            value={this.state.password}
            placeholder="Password" />
          <input
            type="text" 
            onChange={this.update("password2")} 
            value={this.state.password2}
            placeholder="Confirm Password" />
          <input
            type="submit"
            value="Submit" />
        </form>
      </>
    )
  }
}

export default RegisterForm;