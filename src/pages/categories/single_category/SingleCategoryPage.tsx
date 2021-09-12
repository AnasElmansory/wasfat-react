import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import DishCard from "../../../components/dish/DishCard";
import { getDishesByCategory } from "../../../firebase/store/dishes";
import { Dish } from "../../../firebase/store/types";
import { categoryDishesFetched } from "../../../store/categories_slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./SingleCategoryPage.scss";

interface Params {
  id: string;
}

export default function SingleCategoryPage() {
  const { id } = useParams<Params>();
  const [page, setPage] = useState(1);
  const history = useHistory<Dish>();

  const dispatch = useAppDispatch();
  const category = useAppSelector((state) =>
    state.store.category.categories.find((item) => item.id === id)
  );
  const dishCount = category?.dishes.length || 0;
  const totalPages =
    dishCount % 10 === 0 ? dishCount / 10 : Math.floor(dishCount / 10) + 1;
  const start = (page - 1) * 10;
  const end = start + 10;
  const dishesPerPage = category?.dishes.slice(start, end);

  const navigateToDishPage = (dish: Dish) => {
    history.push(`${history.location.pathname}/${dish.id}`, dish);
  };

  useEffect(() => {
    if (category?.dishes.length === 0) {
      console.log("fetching dishes");
      getDishesByCategory(id)
        .then((dishes) => {
          dispatch(categoryDishesFetched({ dishes, categoryId: id }));
        })
        .catch((err) => {
          console.log("error");
        });
    }
  }, []);

  return (
    <div className="single-category-page">
      <div className="single-category-container">
        {dishesPerPage?.map((dish) => (
          <DishCard
            dish={dish}
            key={dish.id}
            navigateToDishPage={() => navigateToDishPage(dish)}
          />
        ))}
      </div>
      <Pagination
        className="pagination-container"
        onChange={(_, page) => {
          setPage(page);
        }}
        size="medium"
        color="primary"
        count={totalPages}
      />
    </div>
  );
}

//last page =0
//if last page = 0 => first fetch()
// if not then fetch with the last id saved
