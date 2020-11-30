/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

// import { loadDevTools } from "./dev-tools/load";
import * as React from "react";
import "./bootstrap";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { Profiler } from "./components/profiler";
import reportWebVitals from "./reportWebVitals";
import { AppProviders } from "./context";
// import 'bootstrap/dist/css/bootstrap-reboot.css'  // this is done in course but haven't figured this out yet. "resets" stuff.

ReactDOM.render(
  <Profiler id="App Root" phases={["mount"]}>
    <AppProviders>
      <App />
    </AppProviders>
  </Profiler>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
