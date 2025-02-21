import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";
import { persistStore } from "redux-persist";

const appStore  = configureStore({
    reducer: appReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
          serializableCheck: false,
        });
      },
});

const persistor = persistStore(appStore);
export { appStore, persistor };