import React from "react";

const Home = ({ logout }) => (
  <>
    <h1>Hello you!</h1>
    <h2 onClick={() => logout()}>Logout</h2>
  </>
);

export default Home;