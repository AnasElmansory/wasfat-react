import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dish } from "../firebase/store/types";

interface DishState {
  dishes: DishPage[];
  lastDoc: Dish | undefined;
  lastPage: number | undefined;
}

interface DeleteDishProps {
  page: number;
  dishId: string;
}

export interface DishPage {
  page: number;
  dishes: Dish[];
}

const dishSlice = createSlice({
  name: "dish",
  initialState: {
    lastDoc: undefined,
    lastPage: undefined,
    dishes: [],
  } as DishState,
  reducers: {
    clear(state) {
      state.dishes = [];
      state.lastPage = undefined;
      state.lastDoc = undefined;
    },
    dishDeleted(state, action: PayloadAction<DeleteDishProps>) {
      state.dishes[action.payload.page - 1].dishes = state.dishes[
        action.payload.page - 1
      ].dishes.filter((dish) => dish.id !== action.payload.dishId);
    },
    dishPageFetched(state, action: PayloadAction<DishPage>) {
      if (action.payload.dishes.length < 10) {
        state.lastPage = action.payload.page;
      }
      state.lastDoc = action.payload.dishes[action.payload.dishes.length - 1];
      const dishPage: DishPage = {
        dishes: action.payload.dishes,
        page: action.payload.page,
      };
      if (state.dishes.length < dishPage.page) {
        state.dishes.push(dishPage);
      }
    },
  },
});

export const { dishPageFetched, dishDeleted, clear } = dishSlice.actions;

export default dishSlice.reducer;
