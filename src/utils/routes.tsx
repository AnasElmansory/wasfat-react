import AddDish from "../pages/add_dish/AddDish";
import CategoryPage from "../pages/categories/CategoryPage";
import SingleCategoryPage from "../pages/categories/single_category/SingleCategoryPage";
import DishesPage from "../pages/dishes/DishesPage";
import OneDishPage from "../pages/dishes/OneDishPage";

export interface AppRoute {
  path: string;
  name: string;
  component: JSX.Element;
  children?: AppRoute[];
}
export default [
  {
    path: "/dashboard/categories",
    name: "Categories",
    component: <CategoryPage />,
    children: [
      {
        name: "SingleCateory",
        path: "/dashboard/categories/:id",
        component: <SingleCategoryPage />,
      },
      {
        name: "OneDishPage",
        path: "/dashboard/categories/:id/:dishId",
        component: <OneDishPage />,
      },
    ],
  },
  {
    path: "/dashboard/dishes",
    name: "Dishes",
    component: <DishesPage />,
    children: [
      {
        name: "OneDishPage",
        path: "/dashboard/dishes/:id",
        component: <OneDishPage />,
      },
    ],
  },
  {
    path: "/dashboard/add-dish",
    name: "Add Dish",
    component: <AddDish />,
  },
] as AppRoute[];
