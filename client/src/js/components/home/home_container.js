import { connect } from "react-redux";
import { logoutUser } from "../../util/user_api_util";
import Home from './home'

const mapStateToProps = state => ({
  username: state.session.username
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);