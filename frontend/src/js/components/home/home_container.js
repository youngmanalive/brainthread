import { connect } from "react-redux";
import { logoutUser } from "../../util/user_api_util";
import Home from './home'

const mapState = state => ({});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(mapState, mapDispatch)(Home);