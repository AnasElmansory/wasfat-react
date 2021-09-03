import { FoodCategory } from "../firebase/store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: FoodCategory[];
}

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  } as CategoryState,
  reducers: {
    categoriesFetched(state, action: PayloadAction<FoodCategory[]>) {
      state.categories = action.payload;
    },
    categoryriorityUpdated(state, action: PayloadAction<FoodCategory>) {
      state.categories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          return action.payload;
        } else {
          return category;
        }
      });
    },
  },
});

export const { categoriesFetched, categoryriorityUpdated } =
  categorySlice.actions;

export default categorySlice.reducer;
