import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CategoryCard from "../../components/category/CategoryCard";
import { getCategories } from "../../firebase/store/categories";
import { FoodCategory } from "../../firebase/store/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { categoriesFetched } from "../../store/categories_slice";
import "./CategoryPage.scss";

export default function CategoryPage() {
  const categories = useAppSelector((state) => state.store.category.categories);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetch() {
      if (categories.length !== 0) {
        setLoading(false);
      } else {
        setLoading(true);
        const _categories = await getCategories();
        dispatch(categoriesFetched(_categories));
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return (
    <div className="category-page">
      {loading ? (
        <div className="loader-wrapper">
          <Spinner variant="primary" animation="border" />
        </div>
      ) : (
        categories.map((category: FoodCategory) => {
          return (
            <CategoryCard
              key={category.id}
              foodCategory={category}
            ></CategoryCard>
          );
        })
      )}
    </div>
  );
}
