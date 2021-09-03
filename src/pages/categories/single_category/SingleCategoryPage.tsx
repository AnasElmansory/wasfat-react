import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getDishes } from "../../../firebase/store/dishes";
import { Dish, FoodCategory } from "../../../firebase/store/types";
import { dishesFetched, lastPageReached } from "../../../store/dishes_slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./SingleCategoryPage.scss";
export default function SingleCategoryPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageCount = useAppSelector((state) => state.dish.dishes.length);
  const lastPage = useAppSelector((state) => state.dish.lastPage);
  const currentPageDishes = useAppSelector(
    (state) =>
      state.dish.dishes.find((dishPage) => dishPage.page === page)?.dishes ?? []
  );

  const category: FoodCategory = {
    ...(location.state as FoodCategory),
  };
  useEffect(() => {
    async function fetch() {
      if (currentPageDishes.length === 10) {
        setLoading(false);
      } else {
        setLoading(true);
        let dishes: Dish[] = [];
        if (lastPage === 0) {
          dishes = await getDishes({});
        } else {
          dishes = await getDishes({
            categoryId: category.id,
            lastDishId: currentPageDishes[-1].id,
          });
        }
        if (dishes.length < 10) {
          dispatch(lastPageReached(page));
        } else {
          dispatch(lastPageReached(page + 1));
        }
        dispatch(dishesFetched({ page, dishes }));

        setLoading(false);
      }
    }
    fetch();
    console.log("dish fetched");
  }, []);
  return (
    <div className="single-category-page">
      <div>
        {currentPageDishes.map((dish) => {
          return <div>{dish.name}</div>;
        })}
      </div>
      <Pagination
        className="pagination-container"
        onChange={(_, page) => {
          setPage(page);
        }}
        size="medium"
        color="primary"
        count={pageCount}
      />
    </div>
  );
}
