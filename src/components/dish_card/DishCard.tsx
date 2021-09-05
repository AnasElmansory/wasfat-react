import { Dish } from "../../firebase/store/types";
import "./DishCard.scss";

export default function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="dish-card">
      <div className="dish-image"><img src={dish.dishImages[0]} /></div>
      <div className="dish-text">
        <span className="dish-title">{dish.name}</span>
        <span className="dish-subtitle">{dish.subtitle}</span>
      </div>
    </div>
  );
}
