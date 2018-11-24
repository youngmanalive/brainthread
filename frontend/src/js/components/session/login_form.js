import React from "react";
import { Link, Redirect } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.errors).length) this.props.clearErrors();
  }

  componentDidUpdate() {
    if (this.state.loading && Object.keys(this.props.errors).length) {
      this.setState({ loading: false });
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const user = Object.assign({}, { email, password });
    this.setState({ loading: true }, () => this.props.login(user));
  }

  isRedirected() {
    const { state } = this.props.location;
    return state ? <h2>{state.message}</h2> : null;
  }

  render() {
    const { loggedIn, location: { state } } = this.props;

    if (loggedIn) {
      const nextPath = !state ? "/home" : state.nextPath;
      return <Redirect to={nextPath} />;
    }

    if (this.state.loading) return <h1>Loading...</h1>;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <Link to="/">Back</Link>
        {this.isRedirected()}
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