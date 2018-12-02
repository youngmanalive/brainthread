import { connect } from "react-redux";

import RegisterForm from "./register_form";
import { checkUsername, registerUser } from "../../actions/session_actions";
import { clearErrors } from "../../actions/error_actions";

const mapStateToProps = state => ({
  errors: state.errors.session,
  validUsername: state.session.username,
  loggedIn: Boolean(state.session.id)
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(registerUser(user)),
  clearErrors: () => dispatch(clearErrors()),
  checkUsername: username => dispatch(checkUsername(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
