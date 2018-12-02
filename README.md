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
- FontAwesome

Frontend bootstrapped with `create-react-app`.



---
## Functionality, etc.

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

      // update state, then call call handleUsername
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
        // then mapped to state as "validUsername"
        this.props.checkUsername(this.state.user.username)
          .then(() => this.setState({ checkingName: false }));
          // update state to remove loading spinner and reflect results
        
      }, 500);
    }
  }

  // ...
}
```