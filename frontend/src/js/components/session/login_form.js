import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
    this.props.login(user);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
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
          type="submit"
          value="Submit" />
      </form>
    )
  }
}

export default LoginForm;