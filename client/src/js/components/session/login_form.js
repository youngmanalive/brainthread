import React from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "../loading";
import styles from "../../../css/login.module.scss";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
    const { name, password } = this.state;
    const user = Object.assign({}, { name, password });

    new Promise(resolve => resolve(this.props.clearErrors()))
      .then(() => (
        this.setState({ loading: true }, () => (
         setTimeout(() => this.props.login(user), 1000)
        ))
      )
    );
  }

  isRedirected() {
    const { state } = this.props.location;
    return state ? <h3>{state.message}</h3> : null;
  }

  render() {
    const { loggedIn, location: { state } } = this.props;

    if (loggedIn) {
      const nextPath = !state ? "/home" : state.nextPath;
      return <Redirect to={nextPath} />;
    }

    const Redirected = () => {
      const { state } = this.props.location;
      return !state ? null :
        <h3 className={styles.redirected}>{state.message}</h3>;
    }

    const style = label => this.props.errors[label]
      ? `${styles.field} ${styles.hasError}`
      : styles.field;

    const buttonDisabled = !(
      this.state.name.length && this.state.password.length
    );

    return (
      <>
        {this.state.loading ? <Loading /> : null}
        <div className={styles.container}>
          <form onSubmit={this.handleSubmit}>
            <Link to="/" className={styles.backButton}>&#8592; Back</Link>
            <h1 className={styles.header}>Login</h1>
            <Redirected />
            <input 
              type="text"
              className={style("name")}
              onChange={this.update("name")}
              value={this.state.name}
              placeholder="Email or Username" />
            <input
              type="password" 
              className={style("password")}
              onChange={this.update("password")} 
              value={this.state.password}
              placeholder="Password" />
            <input
              type="submit"
              className={styles.submitButton}
              disabled={buttonDisabled}
              value="Submit" />
          </form>
          <span className={styles.footer}>
            Don't have an account? &nbsp;
            <Link to="/register" className={styles.loginLink}>Sign up</Link>
          </span>
        </div>
      </>
    )
  }
}

export default LoginForm;