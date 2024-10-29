import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from 'store/features/userSlice'
import routeReducer from 'store/features/routeSlice'
import { authApi } from 'store/services/authApi'
// import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: combineReducers({
    userState: persistReducer({ key: 'userState', storage }, userReducer),
    routeState: routeReducer,
    [authApi.reducerPath]: authApi.reducer,
  }),
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authApi.middleware]),
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;