import { connect } from "react-redux";

import RegisterForm from "./register_form";
import { registerUser } from "../../util/user_api_util";

const mapStateToProps = state => ({
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(registerUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);