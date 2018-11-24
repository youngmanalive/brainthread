import { connect } from "react-redux";

import LoginForm from "./login_form";
import { loginUser } from "../../util/user_api_util";
import { clearErrors } from "../../actions/error_actions";

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id),
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUser(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);