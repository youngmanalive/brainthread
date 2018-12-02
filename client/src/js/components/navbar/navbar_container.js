import { connect } from "react-redux";
import { logoutUser } from "../../actions/session_actions";
import NavBar from "./navbar";

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id),
  user: state.session.username
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);