import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dish, Rating } from "../firebase/store/types";

interface DishState {
  dishes: PaginatedDishesFetch[];
  lastPage: number;
}
export interface PaginatedDishesFetch {
  page: number;
  dishes: Dish[];
}

const dishSlice = createSlice({
  name: "dish",
  initialState: {
    lastPage: 0,
    dishes: [],
  } as DishState,
  reducers: {
    dishesFetched(state, action: PayloadAction<PaginatedDishesFetch>) {
      state.dishes.push(action.payload);
    },
    lastPageReached(state, action: PayloadAction<number>) {
      state.lastPage = action.payload;
    },
  },
});

export const { dishesFetched, lastPageReached } = dishSlice.actions;

export default dishSlice.reducer;
