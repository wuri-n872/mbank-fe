import React from "react";
import { useRedirector } from "hooks/useRedirector";
import { useLogInMutation } from "store/services/authApi";
import { useAppSelector } from "hooks/reduxHooks";

import LoginForm from "./LoginForm";
import "./Login.scss";

export default function Login() {
  const [logIn, { isLoading, error }] = useLogInMutation();
  const { isLoggedIn } = useAppSelector(({ userState }) => userState);
  const { intendedRoute } = useAppSelector(({ routeState }) => routeState);

  useRedirector(intendedRoute || "/", isLoggedIn);

  return (
    <div className="login">
      <LoginForm isLoading={isLoading} handleLogin={logIn} />

      {error && <div id="dummyErrorMessage">JSON.stringify(error)</div>}
    </div>
  );
}
