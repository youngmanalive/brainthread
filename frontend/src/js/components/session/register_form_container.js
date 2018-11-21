import { connect } from "react-redux";

import RegisterForm from "./register_form";
import { registerUser } from "../../util/user_api_util";
import { clearErrors } from "../../actions/error_actions";

const mapStateToProps = state => ({
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(registerUser(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);