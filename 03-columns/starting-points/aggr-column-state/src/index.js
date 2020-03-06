import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import App from "./App";
import "./index.css";

const rootDiv = document.getElementById("root");

const comp = (
  <div>
    <div className={"btn-padding"}></div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);

ReactDOM.render(comp, rootDiv);
