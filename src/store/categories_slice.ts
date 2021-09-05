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
    categroyDishesFetched(state, action: PayloadAction<CategoryDishPayload>) {

      let category = state.categories.find(category => category.id === action.payload.categoryId);
      if (category) {
        category.dishes = category.dishes.concat(...action.payload.dishes);
        if (action.payload.dishes.length !== category.dishes.length) {
          for (const _dish of action.payload.dishes)
            for (const dish of category.dishes) {
              if (dish.id !== _dish.id)
                category.dishes.push(_dish)
            }
        }

        state.categories = state.categories.map((item) =>
          item.id === category!.id ? category! : item
        );
      }
      let updatedCategory = { ...state.currentCategory! }
      updatedCategory.dishes = state.currentCategory?.dishes.concat(action.payload.dishes) || [];
      state.currentCategory = updatedCategory;
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

export const { categoriesFetched, categoryriorityUpdated, categroyDishesFetched, currentCategoryChanged } =
  categorySlice.actions;

export default categorySlice.reducer;
