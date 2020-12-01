import React, { lazy } from "react";
import { useAuth } from "./context/auth-context";
import { FullPageSpinner } from "./components/lib";
import UnauthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";

// const AuthenticatedApp = lazy(
//   () =>
//     new Promise((resolve, reject) => {
//       import("./authenticated-app")
//         .then((result) =>
//           resolve(result.default ? result : { default: result })
//         )
//         .catch(reject);
//     })
// );

// const UnauthenticatedApp = lazy(
//   () =>
//     new Promise((resolve, reject) => {
//       import("./unauthenticated-app")
//         .then((result) =>
//           resolve(result.default ? result : { default: result })
//         )
//         .catch(reject);
//     })
// );
// const AuthenticatedApp = lazy(() => import("./authenticated-app"));
// import "./App.css";
// const UnauthenticatedApp = lazy(() => import("./unauthenticated-app"));

function App() {
  // const user = null;
  const { user } = useAuth();
  console.log("user from app: ", user);
  // return <UnauthenticatedApp />;
  return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
}

export { App };
