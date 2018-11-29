import React from "react";

class NoMatch extends React.Component {
  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    this.props.history.replace("/");
  }

  render() {
    return (
      <>
        <h1>404 not found</h1>
        <br/>
        <h1>Couldn't find resource for: {this.props.param}</h1>
        <br/>
        <button onClick={this.handleRedirect}>RETURN</button>
      </>
    )
  }
}

export default NoMatch;