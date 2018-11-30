import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../css/home.module.scss";

class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Hello, {this.props.username}!</h1>
        <h2 className={styles.about}>Stay tuned for more to come.</h2>
        <Link to="/test">
          <button className={styles.testLink}>Test Page</button>
        </Link>
      </div>
    )
  }
}

export default Home;