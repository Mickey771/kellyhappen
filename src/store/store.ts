// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./reducers";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Get version from environment variable
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0";

const versionToNumber = (version: string) => {
  return parseInt(version.replace(/\./g, ""));
};

const currentVersion = versionToNumber(APP_VERSION);

console.log("Environment version:", APP_VERSION);
console.log("Current version number:", currentVersion);

const persistConfig = {
  key: "root",
  storage,
  version: currentVersion,
  migrate: (state: any) => {
    // If no state exists, return undefined (fresh start)
    if (!state) {
      console.log("No persisted state found, starting fresh");
      return Promise.resolve(undefined);
    }

    // If versions don't match, clear state
    const persistedVersion = state._persist?.version;
    if (persistedVersion !== currentVersion) {
      console.log(
        `Version mismatch: ${persistedVersion} -> ${currentVersion}. Clearing cache.`
      );
      return Promise.resolve(undefined);
    }

    console.log(`Version match: ${currentVersion}. Using persisted state.`);
    return Promise.resolve(state);
  },
  // Optional: Add debug logging
  debug: process.env.NODE_ENV === "development",
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
export default store;
