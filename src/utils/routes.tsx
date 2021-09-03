import CategoryPage from "../pages/categories/CategoryPage";
import SingleCategoryPage from "../pages/categories/single_category/SingleCategoryPage";

export interface AppRoute {
  path: string;
  name: string;
  component: JSX.Element;
  children: AppRoute[];
}
export default [
  {
    path: "/dashboard/categories",
    name: "Categories",
    component: <CategoryPage />,
    children: [
      {
        path: "/dashboard/categories/:id",
        name: "SingleCateory",
        component: <SingleCategoryPage />,
      },
    ],
  },
  {
    path: "/dashboard/dishes",
    name: "Dishes",
    component: <div>dishes page</div>,
    children: [
      {
        path: "/dashboard/categories/:id",
        name: "SingleCateory",
        component: <div>SingleCategoryPage</div>,
      },
    ],
  },
  {
    path: "/dashboard/add-dish",
    name: "Add Dish",
    component: <div>add dish page</div>,
    children: [
      {
        path: "/dashboard/categories/:id",
        name: "SingleCateory",
        component: <div>SingleCategoryPage</div>,
      },
    ],
  },
] as AppRoute[];
