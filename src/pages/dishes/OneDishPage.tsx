import "./OneDishPage.scss";
import { Card } from "@mui/material";
import { Dish } from "../../firebase/store/types";
import { useEffect } from "react";

export default function OneDishPage({ dish }: { dish: Dish }) {
  useEffect(() => {
    const dishDescription = document.createElement("div");
    dishDescription.innerHTML = dish.dishDescription;
    dishDescription.className = "one-dish-description";
    const dishPageElement = document.querySelector(".one-dish-page");
    dishPageElement?.appendChild(dishDescription);
  }, []);
  return (
    <div className="one-dish-page">
      <div className="one-dish-details">
        <Card></Card>
      </div>
    </div>
  );
}
