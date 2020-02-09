import React from "react";
import ReactDOM from "react-dom";
import socket from "socket.io-client";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import App from "./wirc";

export const io = socket("http://localhost:3000", {
  randomizationFactor: 5,
  rememberUpgrade: true
});

const Wirc = () => {
  return <App />;
};

ReactDOM.render(<Wirc />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
