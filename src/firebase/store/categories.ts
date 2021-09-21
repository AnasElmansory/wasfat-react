import { firestore, store } from "../client";
import { FoodCategory } from "./types";

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
      const data = category.data();
      const foodCategory: FoodCategory = {
        id: data["id"] as string,
        name: data["name"] as string,
        imageUrl: data["imageUrl"] as string,
        priortiy: data["priority"] as number,
        dishCount: data["dishCount"] as number,
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

export async function increaseCategoryDishesCount(
  categoryId: string[]
): Promise<boolean> {
  try {
    categoryId.forEach(async (category) => {
      const categoryRef = firestore.doc(store, "food_category", category);
      await firestore.updateDoc(categoryRef, {
        dishCount: firestore.increment(1),
      });
    });
    return true;
  } catch (er) {
    return false;
  }
}
export async function decreaseCategoryDishesCount(
  categoryId: string[]
): Promise<boolean> {
  try {
    categoryId.forEach(async (category) => {
      const categoryRef = firestore.doc(store, "food_category", category);
      await firestore.updateDoc(categoryRef, {
        dishCount: firestore.increment(-1),
      });
    });
    return true;
  } catch (er) {
    return false;
  }
}
