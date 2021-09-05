import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getDishesByCategory } from "../../../firebase/store/dishes";
import DishCard from '../../../components/dish_card/DishCard'
import { categroyDishesFetched } from "../../../store/categories_slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./SingleCategoryPage.scss";
export default function SingleCategoryPage() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const category = useAppSelector(state => state.store.category.currentCategory!)
  const categoryDishPages = (category?.dishes.length || 0) / 10
  console.log(category?.dishes.length)
  const [page, setPage] = useState(Math.floor(categoryDishPages));
  const pageDishes = () => {
    const start = ((page - 1) * 10)
    const end = start + 10
    return category!.dishes.slice(start, end);
  }

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      if (category?.id) {
        const dishes = await getDishesByCategory(category!.id)
        dispatch(categroyDishesFetched({ dishes, categoryId: category!.id, page }))
      }
      setLoading(false)
    }
    console.log("dish fetched");
    fetch();
  }, []);
  return (
    <div className="single-category-page">
      <div className="page-container">
        {loading ? <Spinner variant="primary" animation="border" /> : pageDishes().map((dish) => {
          return <DishCard dish={dish} key={dish.id} />
        })}
      </div>
      <Pagination
        className="pagination-container"
        onChange={(_, page) => {
          setPage(page);
        }}
        size="medium"
        color="primary"
        count={page}
      />
    </div>
  );
}

//last page =0
//if last page = 0 => first fetch()
// if not then fetch with the last id saved