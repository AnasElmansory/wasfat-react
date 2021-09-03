import "./DishCard.scss";

export default function DishCard() {
  return (
    <div className="dish-card">
      <div className="dish-image">image</div>
      <div className="dish-text">
        <span className="dish-title">title</span>
        <span className="dish-subtitle">subtitle</span>
      </div>
    </div>
  );
}
