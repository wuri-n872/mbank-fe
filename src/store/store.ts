import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import userReducer from 'store/features/userSlice'
import routeReducer from 'store/features/routeSlice'
import { authApi } from 'store/services/authApi'
import { accountApi } from 'store/services/accountApi'
// import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  // userState: persistReducer({ key: 'userState', storage }, userReducer),
  userState: userReducer,
  routeState: routeReducer,
  [authApi.reducerPath]: authApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: combineReducers({
      // userState: persistReducer({ key: 'userState', storage }, userReducer),
      userState: userReducer,
      routeState: routeReducer,
      [authApi.reducerPath]: authApi.reducer,
      [accountApi.reducerPath]: accountApi.reducer,
    }),
    preloadedState,
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([authApi.middleware, accountApi.middleware]),
  })
}

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']