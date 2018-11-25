import { connect } from "react-redux";
import { logoutUser } from "../../util/user_api_util";
import NavBar from "./navbar";

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id),
  user: state.session.username
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);