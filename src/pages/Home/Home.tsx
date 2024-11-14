import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import "./Home.scss";
import Link from "components/Button/Link";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import Button from "components/Button/Button";
import { logOut } from "store/features/userSlice";
import TransactionMenu from "./TransactionMenu";
import { WS_URL } from 'app/constants';
import { updateBalance } from 'store/features/userSlice';

const socket = io(WS_URL);

export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { isLoggedIn, user } = useAppSelector(({ userState }) => userState);
  const dispatch = useAppDispatch();
  const handleLogOut = () => dispatch(logOut());
  const handleBalanceUpdated = (balance: number) => {
    dispatch(updateBalance(balance))
    toast('Balance updated: $' + balance.toLocaleString())
  }
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('balance_updated', (data) => {
      const { balance } = data

      console.log(data);
      handleBalanceUpdated(balance)
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('balance_updated');
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      socket.emit('join', { email: user?.email });
    }
  }, [isLoggedIn, user])

  return (
    <div className="home">
      <div>{isConnected ? 'Connected' : 'Disconnected'}</div>
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
