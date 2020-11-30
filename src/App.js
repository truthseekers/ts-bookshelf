import * as React from "react";
import { useAuth } from "./context/auth-context";
import { FullPageSpinner } from "./components/lib";

import "./App.css";
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <UnauthenticatedApp />
    </React.Suspense>
  );
}

export { App };
