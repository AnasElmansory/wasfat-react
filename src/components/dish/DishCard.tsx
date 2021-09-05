import { Dish } from "../../firebase/store/types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Edit, Delete } from "@mui/icons-material";
import "./DishCard.scss";
import EditDishDialog from "./EditDishDialog";
import { useState } from "react";

export default function DishCard({ dish }: { dish: Dish }) {
  const [open, setOpenDialog] = useState(false);
  const deleteDish = () => {
    console.log("delete dish");
  };
  const openEditDishDialog = () => {
    console.log("open edit dish dialog");
    setOpenDialog(true);
  };
  const closeDialog = () => setOpenDialog(false);

  return (
    <Card className="dish-card" raised sx={{ borderRadius: "10px" }}>
      <CardHeader title={dish.name} className="dish-title" />
      <CardMedia
        component="img"
        image={dish.dishImages[0]}
        className="dish-image"
      />
      <CardContent>
        <Typography paragraph className="dish-subtitle">
          {dish.subtitle}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="dish-actions">
        <IconButton onClick={openEditDishDialog}>
          <Edit color="info" />
        </IconButton>
        <IconButton onClick={deleteDish}>
          <Delete color="error" />
        </IconButton>
      </CardActions>
      <EditDishDialog
        open={open}
        close={closeDialog}
        edit={() => {
          console.log("edit");
        }}
        dish={dish}
      />
    </Card>
  );
}
