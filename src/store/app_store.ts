import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user_slice";
import categoryReducer from "./categories_slice";
import dishReducer from "./dishes_slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: userReducer,
  category: categoryReducer,
  dish: dishReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    store: persistedReducer,
  },
});
const persistor = persistStore(store);
export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export default store;
