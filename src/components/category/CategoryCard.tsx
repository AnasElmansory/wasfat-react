import { IconButton, Snackbar } from "@mui/material";
import { Edit, List } from "@mui/icons-material";
import { useState } from "react";
import { useHistory } from "react-router";
import { FoodCategory } from "../../firebase/store/types";
import { useAppDispatch } from "../../store/hooks";
import { categoryPriorityUpdated } from "../../store/categories_slice";
import DashDialog from "../dialog/DashDialog";

import "./CategoryCard.scss";
import { updateCategoryPriority } from "../../firebase/store/categories";
import Alert, { AlertColor } from "@mui/material/Alert";

export default function CategoryCard({
  foodCategory,
}: {
  foodCategory: FoodCategory;
}) {
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [severity, setSnackSeverity] = useState<AlertColor>("success");
  const dispatch = useAppDispatch();
  const openCategoryPriorityEdit = () => setOpenDialog(true);
  const onEditPriority = async (priority: number) => {
    const updatedCatgory: FoodCategory = {
      ...foodCategory,
    };
    updatedCatgory.priortiy = priority;
    const isUpdated = await updateCategoryPriority(foodCategory.id, priority);
    if (isUpdated) {
      dispatch(categoryPriorityUpdated(updatedCatgory));
      setSnackMessage(`Category ${foodCategory.name} Update Failed`);
      setSnackSeverity("success");
    } else {
      setSnackMessage(`Category ${foodCategory.name} Update Failed`);
      setSnackSeverity("error");
    }
    setOpenSnackbar(true);
  };

  const toSingleCategoryPage = () => {
    history.push(`${history.location.pathname}/${foodCategory.id}`);
  };

  return (
    <div className="category-card">
      <div className="category-image">
        <img src={foodCategory.imageUrl} alt={foodCategory.name} />
      </div>
      <div className="category-text">
        <span className="category-title">{foodCategory.name}</span>
        <span className="priority">priority : {foodCategory.priortiy}</span>
        <span className="dish-count">
          {foodCategory.dishCount ? `Dishes : ${foodCategory.dishCount}` : null}{" "}
        </span>
      </div>
      <div className="category-action-btns">
        <IconButton
          className="category-btn category-edit-btn"
          onClick={openCategoryPriorityEdit}
        >
          <Edit color="info" />
        </IconButton>

        <IconButton
          className="category-btn category-details-btn "
          onClick={toSingleCategoryPage}
        >
          <List color="warning" />
        </IconButton>
      </div>
      <DashDialog
        openDialog={openDialog}
        categoryPriority={foodCategory.priortiy}
        categoryName={foodCategory.name}
        onCloseDialog={() => setOpenDialog(false)}
        onEdit={onEditPriority}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        key={foodCategory.id}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          variant="filled"
          elevation={6}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
