import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Root from "./js/components/root";

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>
);

export default App;