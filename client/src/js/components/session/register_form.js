import React from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "../loading";
import styles from "../../../css/register.module.scss";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: this.props.validUsername || "",
        email: "",
        password: "",
        password2: "",
      },
      checkingName: false,
      validInput: true,
      next: false,
      loading: false
    }

    this.typingTimeout = null;
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

  registerUsername() {
    const buttonDisabled = (this.state.checkingName) || !(
      this.props.validUsername &&
      this.state.validInput &&
      this.state.user.username.length > 3
    );

    return (
      <>
        <h2 className={styles.usernameHeader}>Create your username</h2>
        <input
          type="text" autoFocus
          className={styles.field}
          onChange={this.handleUpdate('username')}
          value={this.state.user.username}
          spellCheck="false"
          placeholder="Username" />
        <span className={styles.usernameStatus}>{this.usernameStatus()}</span>
        <button
          className={styles.nextButton}
          onClick={() => this.setState({ next: true })}
          disabled={buttonDisabled}>
          Next
        </button>
        <span className={styles.footer}>
          Already have an account? &nbsp;
          <Link to="/login" className={styles.login}>Log in</Link>
        </span>
      </>
    );
  }

  registerUserInfo() {
    const submitDisabled = !Object.values(this.state.user).every(value => value);
    const { errors } = this.props;

    const style = label => errors[label]
      ? `${styles.field} ${styles.hasError}`
      : `${styles.field}`;

    const Error = ({ label }) => errors[label]
      ? <span className={styles.errorMessage}>* {errors[label]}</span>
      : null;

    return (
      <>
        <h2>Almost done.</h2>
        <h2 className={styles.usernameHeader}>
          Your username: <span className={styles.username}>{this.state.user.username}</span>
        </h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className={style("firstName")}
            onChange={this.handleUpdate("firstName")}
            value={this.state.user.firstName}
            placeholder="First Name" />
          <Error label="firstName" />
          <input
            type="text"
            className={style("lastName")}
            onChange={this.handleUpdate("lastName")}
            value={this.state.user.lastName}
            placeholder="Last Name" />
          <Error label="lastName" />
          <input
            type="email"
            className={style("email")}
            onChange={this.handleUpdate("email")} 
            value={this.state.user.email}
            placeholder="Email" />
          <Error label="email" />
          <input
            type="password"
            className={style("password")}
            onChange={this.handleUpdate("password")} 
            value={this.state.user.password}
            placeholder="Password" />
          <Error label="password" />
          <input
            type="password"
            className={style("password2")}
            onChange={this.handleUpdate("password2")} 
            value={this.state.user.password2}
            placeholder="Confirm Password" />
          <Error label="password2" />
          <div>
            <input
              type="submit"
              className={styles.submitButton}
              value="Register"
              disabled={submitDisabled} />
          </div>
        </form>
      </>
    );
  }

  usernameStatus() {
    if (this.state.checkingName) {
      return <i className="fa fa-spinner fa-pulse" />;
    } else if (!this.state.validInput) {
      return <span style={{color: "red"}}><i className="fa fa-times" /> invalid characters</span>;
    } else if (this.state.user.username.length < 4) {
      return null;
    } else if (!this.props.validUsername) {
      return <span style={{color: "red"}}><i className="fa fa-times" /> not available</span>;
    } else {
      return <i className="fa fa-check" style={{color: "green"}} />;
    }
  }

  handleUpdate(field) {
    if (field === "username") {
      return e => {
        if (this.typingTimeout) clearTimeout(this.typingTimeout);

        const value = e.currentTarget.value.toLowerCase();
        const validInput = /^[a-z0-9_]*$/.test(value);
        const checkingName = (validInput && value.length > 3);

        this.setState({
          user: { ...this.state.user, [field]: value },
          checkingName,
          validInput
        }, this.handleUsername)
      }
    } else {
      return e => this.setState({ 
        user: { ...this.state.user, [field]: e.currentTarget.value }
      });
    }
  }

  handleUsername() {
    if (this.state.checkingName && this.state.validInput) {
      this.typingTimeout = setTimeout(() => {
        this.props.checkUsername(this.state.user.username)
          .then(() => this.setState({ checkingName: false }));
      }, 500);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state.user);
    this.props.clearErrors();
    this.setState({ loading: true }, () => this.props.register(user));
  }

  render() {
    if (this.props.loggedIn) return <Redirect to="/home" />;

    const form = this.state.next
      ? (this.registerUserInfo())
      : (this.registerUsername());

    const BackButton = () => this.state.next 
      ? <span className={styles.goBack}
          onClick={() => this.setState({ next: false })}>
          &#8592; Back
        </span>
      : <Link to="/" className={styles.goBack}>&#8592; Back</Link>;
  
    return (
      <>
        {this.state.loading ? <Loading /> : null}
        <div className={styles.container}>
          <BackButton />
          <h1 className={styles.header}>Sign Up</h1>
          {form}
        </div>
      </>
    );
  }
}

export default RegisterForm;