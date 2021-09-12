import "./OneDishPage.scss";
import { Card, CardMedia, Typography, CardContent, Box } from "@mui/material";
import { useEffect } from "react";
import { Dish } from "../../firebase/store/types";
import { useLocation } from "react-router-dom";

export default function OneDishPage() {
  const { state: dish } = useLocation<Dish>();
  useEffect(() => {
    const element = document.querySelector(".one-dish-description");
    if (!element) {
      const dishDescription = document.createElement("div");
      dishDescription.innerHTML = dish.dishDescription;
      dishDescription.className = "one-dish-description";
      const dishPageElement = document.querySelector(".one-dish-page");
      dishPageElement?.appendChild(dishDescription);
    }
  }, []);
  return (
    <div className="one-dish-page">
      <div className="one-dish-details">
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            borderRadius: "10px",
          }}
          raised
        >
          <CardMedia
            component="img"
            id="one-dish-image"
            image={dish.dishImages[0]}
          />

          <CardContent>
            <Typography variant="h5" id="one-dish-name">
              {dish.name}
            </Typography>
            <Typography variant="subtitle1" id="one-dish-subtitle">
              {dish.subtitle}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
