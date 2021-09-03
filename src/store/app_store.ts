import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user_slice";
import categoryReducer from "./categories_slice";
import dishReducer from "./dishes_slice";
const store = configureStore({
  reducer: {
    auth: userReducer,
    category: categoryReducer,
    dish: dishReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
