import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./Redux/storeConfig/store";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./index.css";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Routes />
      <ToastContainer newestOnTop limit={1} />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
