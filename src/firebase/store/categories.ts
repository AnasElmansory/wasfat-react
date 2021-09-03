import { firestore, store } from "../client";
import { Dish, FoodCategory } from "./types";

export async function getCategories(): Promise<FoodCategory[]> {
  const categoryQuery = firestore.query(
    firestore.collection(store, "food_category"),
    firestore.orderBy("priority")
  );
  const query = await firestore.getDocs(categoryQuery);
  if (query.empty) {
    return [] as FoodCategory[];
  } else {
    return query.docs.map((category) => {
      const foodCategory: FoodCategory = {
        id: category.data()["id"],
        name: category.data()["name"],
        imageUrl: category.data()["imageUrl"],
        priortiy: category.data()["priority"] as number,
        dishes: [],
      };
      return foodCategory;
    });
  }
}
export async function updateCategoryPriority(
  categoryId: string,
  value: number
): Promise<boolean> {
  try {
    await firestore.updateDoc(
      firestore.doc(store, "food_category", categoryId),
      {
        priority: value,
      }
    );
    return true;
  } catch (_) {
    return false;
  }
}
