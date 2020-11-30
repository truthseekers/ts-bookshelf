import * as React from "react";
import * as auth from "../auth-provider";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { queryCache } from "react-query";
import { FullPageSpinner, FullPageErrorFallback } from "../components/lib";

async function bootstrapAppData() {
  let user = null;

  const token = await auth.getToken();
  if (token) {
    const data = await client("bootstrap", { token });
    queryCache.setQueryData("list-items", data.listItems, {
      staleTime: 5000,
    });
    user = data.user;
  }
  return user;
}

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = "login";
  // const login = React.useCallback(
  //   (form) => auth.login(form).then((user) => setData(user)),
  //   [setData]
  // );
  const register = React.useCallback(
    (form) => auth.register(form).then((user) => setData(user)),
    [setData]
  );

  //   const value = "yes";
  const value = React.useMemo(() => ({ login, register }), [login, register]);

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
}

function useClient() {
  const { user } = useAuth();
  const token = user?.token;
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { AuthProvider, useAuth, useClient };
