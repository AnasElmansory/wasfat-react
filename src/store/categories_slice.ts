import { Dish, FoodCategory } from "../firebase/store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: FoodCategory[];
  currentCategory?: FoodCategory;
  categoryLastPage: number

}

interface CategoryDishPayload {
  dishes: Dish[],
  categoryId: string
  page: number;

}

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    currentCategory: undefined,
    categoryLastPage: -1,
  } as CategoryState,
  reducers: {
    currentCategoryChanged(state, action: PayloadAction<FoodCategory>) {
      if (state.currentCategory?.id !== action.payload.id) {

        state.categoryLastPage = 0;
      }
      state.currentCategory = action.payload;
    },
    categoriesFetched(state, action: PayloadAction<FoodCategory[]>) {
      state.categories = action.payload;
    },
    categoryDishesFetched(
      state,
      action: PayloadAction<{ dishes: Dish[]; categoryId: string }>
    ) {
      state.categories = state.categories.map((category) => {
        if (category.id === action.payload.categoryId) {
          const updatedCateogry = { ...category };
          updatedCateogry.dishes = action.payload.dishes;
          return updatedCateogry;
        } else {
          return category;
        }
      });
    },
    categoryPriorityUpdated(state, action: PayloadAction<FoodCategory>) {
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

export const {
  categoriesFetched,
  categoryPriorityUpdated,
  categoryDishesFetched,
} = categorySlice.actions;

export default categorySlice.reducer;
