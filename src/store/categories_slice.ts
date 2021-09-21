import { Dish, FoodCategory } from "../firebase/store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: FoodCategory[];
}

interface DeleteAction {
  categoryId: string[];
  dishId: string;
}

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    currentCategory: undefined,
    categoryLastPage: -1,
  } as CategoryState,
  reducers: {
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
    categoryDishDeleted(state, action: PayloadAction<DeleteAction>) {
      state.categories = state.categories.map((category) => {
        action.payload.categoryId.forEach((id) => {
          if (category.id === id) {
            category.dishes = category.dishes.filter(
              (dish) => dish.id !== action.payload.dishId
            );
          }
        });
        return category;
      });
    },
    categoryDishIncreased(
      state,
      action: PayloadAction<{ categoryId: string[] }>
    ) {
      state.categories = state.categories.map((category) => {
        if (action.payload.categoryId.includes(category.id)) {
          category.dishCount++;
        }
        return category;
      });
    },
    categoryDishDecreased(
      state,
      action: PayloadAction<{ categoryId: string[] }>
    ) {
      state.categories = state.categories.map((category) => {
        if (action.payload.categoryId.includes(category.id)) {
          category.dishCount--;
        }
        return category;
      });
    },
  },
});

export const {
  categoriesFetched,
  categoryPriorityUpdated,
  categoryDishesFetched,
  categoryDishDeleted,
  categoryDishIncreased,
  categoryDishDecreased,
} = categorySlice.actions;

export default categorySlice.reducer;
