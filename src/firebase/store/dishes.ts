import { firestore, store } from "../client";
import { Dish } from "./types";

export async function getDishes({
  limit = 10,
  categoryId,
  lastDishId,
}: {
  limit?: number;
  categoryId?: string;
  lastDishId?: string;
}): Promise<Dish[]> {
  const queries: firestore.QueryConstraint[] = [
    firestore.orderBy("addDate", "desc"),
    firestore.limit(limit),
  ];
  if (lastDishId) {
    queries.push(firestore.startAfter([{ id: lastDishId }]));
  }

  const paginatedDishQuery = firestore.query(
    firestore.collection(store, "dishes"),
    ...queries
  );
  const query = await firestore.getDocs(paginatedDishQuery);
  return query.docs.map((doc) => {
    const data = doc.data();
    const dish: Dish = {
      id: data["id"],
      name: data["name"],
      rating: data["rating"],
      addDate: data["addDate"],
      subtitle: data["subtitle"],
      categoryId: data["categoryId"],
      dishImages: data["dishImages"],
      dishDescription: data["dishDescription"],
    };
    return dish;
  });
}

export async function getDishesByCategory(categoryId: string): Promise<Dish[]> {
  const categoryQuery = firestore.query(
    firestore.collection(store, "dishes"),
    firestore.where("categoryId", "array-contains", categoryId)
  );
  const query = await firestore.getDocs(categoryQuery);
  return query.docs.map((doc) => {
    const data = doc.data();
    const dish: Dish = {
      id: data["id"],
      name: data["name"],
      rating: data["rating"],
      addDate: data["addDate"],
      subtitle: data["subtitle"],
      categoryId: data["categoryId"],
      dishImages: data["dishImages"],
      dishDescription: data["dishDescription"],
    };
    return dish;
  });
}
