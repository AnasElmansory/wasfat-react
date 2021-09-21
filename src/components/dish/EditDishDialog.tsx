import { Dish } from "../../firebase/store/types";
import {
  getIngredients,
  getDescription,
  generateDishDescription,
} from "../../utils/dish_helper";
import { Dialog, TextField, Button, InputLabelProps } from "@mui/material";

import "./EditDishDialog.scss";
import ImagePickerContainer from "./ImagePicker";
import { useState } from "react";

interface DialogProps {
  dish: Dish;
  open: boolean;
  close: () => void;
  onEdit: (updatedDish: Dish) => void;
}
export default function EditDishDialog({
  dish,
  open,
  close,
  onEdit,
}: DialogProps) {
  const inputProps: InputLabelProps = {
    color: "warning",
    sx: { fontSize: "24px" },
  };

  const [name, setName] = useState(dish.name);
  const [subtitle, setSubtitle] = useState(dish.subtitle);
  const [ingredients, setIngredients] = useState(
    getIngredients(dish.dishDescription)
  );
  const [dishImages, setDishImages] = useState(dish.dishImages);
  const [description, setDescription] = useState(
    getDescription(dish.dishDescription)
  );

  async function onDishEdit() {
    const updatedDish: Dish = {
      ...dish,
    };
    updatedDish.name = name;
    updatedDish.subtitle = subtitle;
    updatedDish.dishImages = dishImages;
    updatedDish.dishDescription = generateDishDescription({
      ingredients,
      description,
      dishImages,
    });
    onEdit(updatedDish);
  }

  function updateDishImages(image: string, index: number) {
    const newDishImages = dishImages.map((img, imgIndex) => {
      if (imgIndex === index) {
        return image;
      } else {
        return img;
      }
    });
    setDishImages(newDishImages);
  }
  return (
    <Dialog
      className="edit-dish-dialog"
      open={open}
      onClose={close}
      fullWidth
      maxWidth="md"
    >
      <div className="edit-dish-dialog-container">
        <div className="form-row">
          <TextField
            className="edit-dish-field"
            variant="filled"
            label="اسم الطبق"
            InputLabelProps={inputProps}
            value={name}
            onChange={(event) => setName(event.target.value)}
            multiline
            color="warning"
          />
          <TextField
            className="edit-dish-field"
            variant="filled"
            label="وصف الطبق"
            InputLabelProps={inputProps}
            value={subtitle}
            onChange={(event) => setSubtitle(event.target.value)}
            fullWidth
            multiline
            color="warning"
          />
        </div>
        <div className="form-row">
          <TextField
            id="dish-ingredients"
            className="edit-dish-field"
            variant="filled"
            label="المكونات"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            multiline
            InputLabelProps={inputProps}
            fullWidth
            color="warning"
          />

          <TextField
            className="edit-dish-field"
            label="طريقة التحضير"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            variant="filled"
            InputLabelProps={inputProps}
            fullWidth
            multiline
            color="warning"
          />
        </div>

        <ImagePickerContainer
          images={dishImages}
          dishId={dish.id}
          categoryId={dish.categoryId[0]}
          updateDishImages={updateDishImages}
        />

        <div className="edit-dish-dialog-action-btn">
          <Button color="info" onClick={onDishEdit}>
            Edit
          </Button>
          <Button color="warning" onClick={close}>
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
