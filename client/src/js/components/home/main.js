import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NoMatch from "./no_match";
import styles from "../../../css/main.module.scss";

class Main extends React.Component {
  render() {
    const { loggedIn, location: { state } } = this.props;
    if (state && state.notFound) return <NoMatch {...this.props} param={state.param} />;
    
    const MainButton = () => {
      let info = loggedIn ? ["/home", "Home"] : ["/register", "Sign up"];
      return (
        <Link to={`${info[0]}`}>
          <button className={styles.button}>{info[1]}</button>
        </Link>
      );
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Welcome!</h1>
        <h2 className={styles.about}>BrainThread is a sandbox to ponder and share your thoughts</h2>
        <MainButton />
      </div>
    )
  }
}

const msp = state => ({ loggedIn: Boolean(state.session.id) });


export default connect(msp)(Main);