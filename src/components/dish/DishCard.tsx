import "./DishCard.scss";
import { Dish } from "../../firebase/store/types";
import {
  Card,
  CardMedia,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
  AlertColor,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, List } from "@mui/icons-material";
import { useState } from "react";
import { firestore, store } from "../../firebase/client";
import { FirestoreError } from "@firebase/firestore";
import { useAppDispatch } from "../../store/hooks";
import { categoryDishDeleted } from "../../store/categories_slice";
import { dishDeleted } from "../../store/dishes_slice";
import EditDishDialog from "./EditDishDialog";

interface DishCardProps {
  dish: Dish;
  page?: number;
  navigateToDishPage: () => void;
}

export default function DishCard({
  dish,
  page,
  navigateToDishPage,
}: DishCardProps) {
  const dispatch = useAppDispatch();
  const [open, setOpenDialog] = useState<boolean>(false);
  const [openSnackbar, setSnackOpen] = useState<boolean>(false);
  const [snackbarEvent, setSnackbarEvent] = useState<string>();
  const [snackbarColor, setSnackbarColor] = useState<AlertColor>();

  const deleteDish = async () => {
    if (window.confirm(`Are you sure you want to delete ${dish.name}`)) {
      const dishRef = firestore.doc(store, "dishes", dish.id);
      try {
        await firestore.deleteDoc(dishRef);
        setSnackbarColor("success");
        setSnackbarEvent(`dish ${dish.name} has been deleted successfully!`);
        if (page) {
          dispatch(dishDeleted({ page, dishId: dish.id }));
        }
        dispatch(
          categoryDishDeleted({ categoryId: dish.categoryId, dishId: dish.id })
        );
      } catch (e: any) {
        setSnackbarColor("error");
        setSnackbarEvent((e as FirestoreError).name);
      }
      setSnackOpen(true);
    }
  };

  const editDish = async (updatedDish: Dish) => {
    const dishRef = firestore.doc(store, "dishes", dish.id);
    try {
      await firestore.updateDoc(dishRef, { ...updatedDish });
      setSnackbarColor("success");
      setSnackbarEvent(`dish ${dish.name} has been deleted successfully!`);
    } catch (e: any) {
      setSnackbarColor("error");
      setSnackbarEvent((e as FirestoreError).name);
    }
    setSnackOpen(true);
  };

  const openEditDishDialog = () => setOpenDialog(true);
  const closeDialog = () => setOpenDialog(false);

  return (
    <Card className="dish-card" raised sx={{ borderRadius: "10px" }}>
      <CardHeader title={dish.name} className="dish-title" />

      <CardMedia
        className="dish-image"
        component="img"
        image={dish.dishImages[0]}
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

        <Tooltip title="show dish content">
          <IconButton onClick={navigateToDishPage}>
            <List color="warning" />
          </IconButton>
        </Tooltip>
      </CardActions>

      <EditDishDialog
        open={open}
        close={closeDialog}
        onEdit={editDish}
        dish={dish}
      />
      <Snackbar
        open={openSnackbar}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity={snackbarColor} variant="filled">
          <span className="snack-event">{snackbarEvent}</span>
        </Alert>
      </Snackbar>
    </Card>
  );
}
