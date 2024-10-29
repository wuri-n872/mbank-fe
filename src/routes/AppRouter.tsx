import React from 'react'
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from './routes';

function Routes() {
  const appRoutes = useRoutes(routes);

  return appRoutes;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes />  
    </BrowserRouter>
  )
}

export default AppRouter;

