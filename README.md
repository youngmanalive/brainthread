## BrainThread

Initial stages. Stay tuned.

MERN stack, single page app.

## Technologies, etc:

- Node
- MongoDB (hosted on mLab)
- Mongoose
- Express
- React
- Redux
- Axios
- Passport
- Bcrypt
- Sass
- Webpack
- Babel

Frontend bootstrapped with `create-react-app`.



---

## Functionality, etc.

### Protected Routes and Redirection

![image](docs/redirection.png)

If a non-member or logged-out user is trying to access a protected route, we'll `<Redirect />` to the login page, and send the attempted path and a message along with it. 

```jsx
// route_util.js

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={handleRedirect(props.location.pathname)} />
    )
  )} />
);

const handleRedirect = nextPath => ({
  pathname: "/login",
  state: {
    message: "* You must be logged in to do that. Please sign in.",
    nextPath
  }
});
```

Inside rendering the login form, check `this.props.location.state` for a redirect object. If state was recieved, render the message. Once the user logs in, redirect to the original path.

```jsx
// login_form.js

class LoginForm extends Component {

  // ...

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

    return (
        <form onSubmit={this.handleSubmit}>
          <Link to="/" >Back</Link>
          <h1>Login</h1>
          <Redirected />
          <input 
            type="text" 
            onChange={this.update("email")} 
            value={this.state.email}
            placeholder="Email" />

            // ...
            
        </form>
    )
            
  }

}
```

### Registering username

Waits for visitor to stop typing, then queries db for existing username.
Also checks for valid input at any on change event.

![image](docs/register_username.gif)

```jsx
class RegisterForm extends React.Component {
  constructor(props) {

    this.state = {
      user: {
        // ...
      }
      checkingName: false
      validInput: true,
    }

    // timeout is initially set to null
    this.typingTimeout = null;
  }

  handleUpdate(field) {
    return e => {
      // clear timeout if currently being executed
      if (this.typingTimeout) clearTimeout(this.typingTimeout);

      // determine valid string
      const value = e.currentTarget.value.toLowerCase();
      const validInput = /^[a-z0-9_]*$/.test(value);
      const checkingName = (validInput && value.length > 3);

      // update state, then handleUsername
      this.setState({
        user: { ...this.state.user, [field]: value },
        checkingName,
        validInput
      }, this.handleUsername)
    }
  }

  handleUsername() {
    // if valid input, fire a query after 500ms of inactivity
    if (this.state.checkingName && this.state.validInput) {
      this.typingTimeout = setTimeout(() => {

        // checkUsername will dispatch the result to the store,
        // then mapped to props as "validUsername"
        this.props.checkUsername(this.state.user.username)
          .then(() => this.setState({ checkingName: false }));
          // update state to remove loading spinner and reflect results
        
      }, 500);
    }
  }

  // ...
}
```