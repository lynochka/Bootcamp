//TODO: pass slice reducers directly as in https://redux-toolkit.js.org/api/configureStore

import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./reducers";

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
  return store;
}

// redux-immutable-state-invariant: is added to the store by default by configureStore and getDefaultMiddleware
// redux-thunk:                     is added to the store by default by configureStore and getDefaultMiddleware

// devTools: true should automatically enable support for the Redux DevTools browser extension.
