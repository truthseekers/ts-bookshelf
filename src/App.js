import * as React from "react";
import { useAuth } from "./context/auth-context";
import { FullPageSpinner } from "./components/lib";

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./authenticated-app")
);
// import "./App.css";
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

const bodyData = {
  name: "Juicy",
  password: "pass123",
};

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
    };
  }

  componentDidMount() {
    console.log("whaa");
    window
      .fetch("http://localhost:3001/register", {
        method: "POST",
        mode: "cors",
        // cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("still worked worked? data: ", data);
        // this.setState({ hits: data.hits });
      });
  }

  // componentDidMount() {
  //   console.log("whaa");
  //   fetch(API + DEFAULT_QUERY)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("worked? data: ", data);
  //       this.setState({ hits: data.hits });
  //     });
  // }

  // componentDidMount() {
  //   // const apiUrl = "https://api.github.com/users/hacktivist123/repos";
  //   const apiUrl = "http://localhost:3001/register";
  //   window
  //     .fetch(apiUrl, {
  //       method: "POST",
  //       mode: "cors",
  //       credentials: "omit",
  //       body: JSON.stringify(bodyData),
  //     })
  //     .then((response) => response.json())
  //     .then((data) => console.log("JUST REGISTER This is your data", data));
  // }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}

function App() {
  // const { user } = useAuth();
  return (
    <MyComponent />
    // <React.Suspense fallback={<FullPageSpinner />}>
    //   {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    // </React.Suspense>
  );
}

export { App };
