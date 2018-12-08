# BrainThread

Initial stages. Stay tuned.

MERN stack, single page app. Really just a big sandbox for me to play around in because I'm addicted to JavaScript and there's nothing you can do about it. 

# Technologies, etc.

- Server
  - Node
  - MongoDB (hosted on [mLab](https://mlab.com/))
  - [mongoose](https://www.npmjs.com/package/mongoose)
  - [express](https://www.npmjs.com/package/express)
  - [body-parser](https://www.npmjs.com/package/body-parser)
  - [passport](https://www.npmjs.com/package/passport)
  - [passport-jwt](https://www.npmjs.com/package/passport-jwt)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [bcrypt](https://www.npmjs.com/package/bcryptjs)
  - [validator](https://www.npmjs.com/package/validator) (string validation)

- Client
  - React (bootstrapped with [create-react-app](https://www.npmjs.com/package/create-react-app))
  - [redux](https://www.npmjs.com/package/react-redux)
  - [axios](https://www.npmjs.com/package/axios)
  - [react-idle-timer](https://www.npmjs.com/package/react-idle-timer) (auto logout)
  - [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
  - [redux-thunk](https://www.npmjs.com/package/redux-thunk)
  - [jwt-decode](https://www.npmjs.com/package/jwt-decode)
  - CSS Modules (SCSS)
  - [node-sass](https://www.npmjs.com/package/node-sass)
  - [Font Awesome](https://fontawesome.com/)

- Dev, etc
  - [nodemon](https://www.npmjs.com/package/nodemon)
  - [concurrently](https://www.npmjs.com/package/concurrently)
  - JSON Web Tokens (Bearer)
  - RESTful implementations

---

# Functionality, UI, etc.
- [Protected Routes](#protected-routes-and-redirection)
- [Registering Username](#registering-username)

## Protected Routes and Redirection

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
  
  state: {    // send message and attmepted path with redirect
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

    // Once logged in, redirect to original path.
    // Redirect to /home if state was not receieved.
    if (loggedIn) {
      const nextPath = !state ? "/home" : state.nextPath;
      return <Redirect to={nextPath} />;
    }

    // render message if redirected
    const Redirected = () => {
      const { state } = this.props.location;
      return !state ? null : <h3>{state.message}</h3>;
    };

    return (
      <form onSubmit={this.handleSubmit}>
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
---
## Registering Username

Check for valid input at any on change event.
Wait for visitor to stop typing, then query db for existing username.

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