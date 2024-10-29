import React from "react";

import "./Home.scss";
import Link from "components/Button/Link";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { User } from "store/services/types";
import Button from "components/Button/Button";
import { logOut } from "store/features/userSlice";
import TransactionMenu from "./TransactionMenu";

function renderGreatings(user: User | undefined) {
  return user ? `Welcome back ${user.name}` : "Login to access your account";
}

export default function Home() {
  const dispatch = useAppDispatch();
  const handleLogOut = () => dispatch(logOut());
  const { isLoggedIn, user } = useAppSelector(({ userState }) => userState);

  return (
    <div className="home">
      {isLoggedIn && <TransactionMenu user={user!} />}

      <div style={{ marginTop: "3rem" }}>
        {isLoggedIn ? (
          <Button onClick={handleLogOut}>Log me out</Button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
