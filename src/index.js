/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

// import { loadDevTools } from "./dev-tools/load";
import "./bootstrap";
import * as React from "react";
import ReactDOM from "react-dom";
import { Profiler } from "./components/profiler";
import { App } from "./App";
import { AppProviders } from "./context";
// import "./index.css";
// import reportWebVitals from "./reportWebVitals";
// import 'bootstrap/dist/css/bootstrap-reboot.css'  // this is done in course but haven't figured this out yet. "resets" stuff.

ReactDOM.render(
  <App />,
  // <Profiler id="App Root" phases={["mount"]}>
  //   <AppProviders>
  //     <App />
  //   </AppProviders>
  // </Profiler>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
