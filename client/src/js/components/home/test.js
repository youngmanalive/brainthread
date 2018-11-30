import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentUser } from "../../util/user_api_util";
import styles from "../../../css/test.module.scss";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, validRoute: true }
  }

  componentDidMount() {
    const keywords = ["test"];
    const { test } = this.props.match.params;
    
    if (keywords.includes(test)) {
      this.setState({ loading: false });
    } else {
      this.setState({ validRoute: false })
    }
  }

  noMatch() {
    const param = this.props.match.params.test;
    return {
      pathname: "/",
      state: { notFound: true, param }
    }
  }

  render() {
    if (!this.state.validRoute) return <Redirect to={this.noMatch()} />;
    if (this.state.loading) return <h1>Loading...</h1>;

    return (
      <div className={styles.container}>
        <h1 className={styles.header}>
          Testing 123, {this.props.username}!
        </h1>
        <p>
          Clicking <button 
                      onClick={() => this.props.getCurrentUser()}
                      >HERE</button> will
          make an authorized get request.
        </p>
        <Link to="/home" className={styles.homeLink}>&#8592; Home</Link>
      </div>
    )
  }
}

const msp = state => ({ username: state.session.username });
const mdp = dispatch => ({ getCurrentUser: () => dispatch(getCurrentUser())});

export default connect(msp, mdp)(Test);