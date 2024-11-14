import Layout from "components/Layout/Layout";
import Deposit from "pages/Deposit/Deposit";
import Home from "pages/Home";
import Login from "pages/Login/Login";
import Withdraw from "pages/Withdraw/Withdraw";
import withRestriction from "pages/withRestriction";
import React, { createRef } from "react";

const routes = [
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
        nodeRef: createRef(),
      },
      {
        path: 'login',
        Component: Login,
        nodeRef: createRef(),
      },
      {
        path: 'withdraw',
        Component: withRestriction(Withdraw),
        nodeRef: createRef(),
      },
      {
        path: 'deposit',
        Component: withRestriction(Deposit),
        nodeRef: createRef(),
      },
    ],
  },
  // {
  //   path: "/auth",
  //   Component: GuestLayout,
  //   children: [
  //     {
  //       path: "login",
  //       Component: LoginPage,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <div>404 - Are u lost ?</div>,
    nodeRef: createRef(),
  },
];

export default routes;
