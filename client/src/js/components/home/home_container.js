import { connect } from "react-redux";
import Home from './home'

const mapStateToProps = state => ({
  username: state.session.username
});

export default connect(mapStateToProps)(Home);