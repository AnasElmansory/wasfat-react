export interface FoodCategory {
  id: string;
  name: string;
  imageUrl: string;
  priortiy: number;
  dishCount: number;
  dishes: Dish[];
}

export type Rating = {
  [id: string]: number;
};

export interface Dish {
  id: string;
  name: string;
  rating: Rating;
  addDate: number;
  subtitle: string;
  dishImages: string[];
  categoryId: string[];
  dishDescription: string;
}

export interface Category {
  id: string;
  name: string;
  isSelected: boolean;
}
