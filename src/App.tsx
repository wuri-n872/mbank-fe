import React, { StrictMode } from "react";
import { Provider } from 'react-redux'
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';

import AppRouter from "routes/AppRouter";
import { setupStore } from 'store/store'

import "./App.scss";

const store = setupStore();
const persistor = persistStore(store);

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
          <AppRouter />
      </Provider>
    </StrictMode>
  );
}

export default App;
