import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Button, Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./DishesPage.scss";
import { firestore, store } from "../../firebase/client";
import { dishPageFetched, clear } from "../../store/dishes_slice";
import { Dish } from "../../firebase/store/types";
import DishCard from "../../components/dish/DishCard";
import { useHistory } from "react-router-dom";

export default function DishesPage() {
  const history = useHistory<Dish>();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const lastPage = useAppSelector((state) => state.store.dish.lastPage);
  const totalPages = useAppSelector(
    (state) => state.store.dish.dishes.length + 1
  );
  const paginationCount = !lastPage ? totalPages : lastPage;
  const lastDoc = useAppSelector((state) => state.store.dish.lastDoc);

  const currentDishPage = useAppSelector((state) =>
    state.store.dish.dishes.find((dishPage) => dishPage.page === currentPage)
  )?.dishes;

  const navigateToDishPage = (dish: Dish) => {
    history.push(`${history.location.pathname}/${dish.id}`, dish);
  };

  // dispatch(clear());
  useEffect(() => {
    setLoading(true);
    if (!currentDishPage || currentDishPage?.length < 10) {
      getDishPage(currentPage);
    }
    setLoading(false);
  }, [currentPage]);

  async function getDishPage(page: number) {
    const dishQueryList: firestore.QueryConstraint[] = [
      firestore.orderBy("addDate", "desc"),
      firestore.limit(10),
    ];
    if (lastDoc) {
      dishQueryList.push(firestore.startAfter(lastDoc!.addDate));
    }
    const dishQuery = firestore.query(
      firestore.collection(store, "dishes"),
      ...dishQueryList
    );
    const query = await firestore.getDocs(dishQuery);
    const dishes = query.docs.map((doc) => {
      const data = doc.data();
      const dish: Dish = {
        id: data["id"],
        name: data["name"],
        rating: data["rating"],
        addDate: data["addDate"],
        subtitle: data["subtitle"],
        dishImages: data["dishImages"],
        categoryId: data["categoryId"],
        dishDescription: data["dishDescription"],
      };
      return dish;
    });
    dispatch(dishPageFetched({ dishes, page }));
  }

  return (
    <div className="dishes-page">
      <div className="dishes-container">
        {loading || !currentDishPage ? (
          <div className="loader-wrapper">
            <Spinner variant="primary" animation="border" />
          </div>
        ) : (
          currentDishPage.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              page={currentPage}
              navigateToDishPage={() => navigateToDishPage(dish)}
            />
          ))
        )}
      </div>
      <Pagination
        id="dishes-pagination"
        size={navigator.userAgent.includes("Mobile") ? "small" : "medium"}
        page={currentPage}
        count={paginationCount}
        onChange={(_, page) => setCurrentPage(page)}
        color="primary"
      />
    </div>
  );
}
