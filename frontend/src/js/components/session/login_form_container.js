import { connect } from "react-redux";

import LoginForm from "./login_form";
import { loginUser } from "../../util/user_api_util";

const mapStateToProps = state => ({
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);