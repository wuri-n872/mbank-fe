import React, { StrictMode } from "react";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import AppRouter from "routes/AppRouter";
import { persistor, store } from 'store/store'

import "./App.scss";

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}

export default App;
