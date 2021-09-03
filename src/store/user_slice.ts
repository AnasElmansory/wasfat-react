import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../firebase/auth";

interface UserSliceState {
  user: User | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as UserSliceState,

  reducers: {
    loggedIn(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    loggedOut(state) {
      state.user = null;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;

export default userSlice.reducer;
