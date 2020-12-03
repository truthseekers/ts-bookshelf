import React, { lazy } from "react";
import { useAuth } from "./context/auth-context";
import { FullPageSpinner } from "./components/lib";

const AuthenticatedApp = lazy(() => import("./authenticated-app"));
// import "./App.css";
const UnauthenticatedApp = lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  // console.log("user from app: ", user);
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
