import { Dish } from "../../firebase/store/types";
import {
  extractImages,
  extractText,
  formatDescription,
  getDescription,
  getIngredients,
} from "../../utils/dish_helper";
import {
  Dialog,
  TextField,
  Button,
  InputLabelProps,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";

import "./EditDishDialog.scss";
import ImagePickerContainer from "./ImagePicker";
import { useState } from "react";
import { firestore, store } from "../../firebase/client";

interface DialogProps {
  dish: Dish;
  open: boolean;
  close: () => void;
  edit: () => void;
}
export default function EditDishDialog({
  dish,
  open,
  close,
  edit,
}: DialogProps) {
  const inputProps: InputLabelProps = {
    color: "warning",
    sx: { fontSize: "24px" },
  };

  const [openSnackbar, setOpenSnack] = useState<boolean>(false);
  const [snackbarColor, setSnackColor] = useState<AlertColor>("success");
  const [snackbarEvent, setSnackEvent] = useState<string>("");

  const [name, setName] = useState(dish.name);
  const [subtitle, setSubtitle] = useState(dish.subtitle);
  const [ingredients, setIngredients] = useState(
    getIngredients(dish.dishDescription)
  );
  const [dishImages, setDishImages] = useState(dish.dishImages);
  const [description, setDescription] = useState(
    getDescription(dish.dishDescription)
  );

  function generateDishDescription(): string {
    const filteredIngredients = ingredients
      .replace(/(المكونات|المقادير|المكوّنات)/, "")
      .trim();
    const filteredSteps = description
      .replace(/(طريقه التحضير|طريقة التحضير|الخطوات)/, "")
      .trim();

    const ingredientsHtml =
      "<h2>المكونات</h2>\n" +
      filteredIngredients
        .split("\n")
        .map((line) => `<p>${line.trim()}</p>`)
        .join("\n");

    const descriptionHtml =
      "<h2>طريقة التحضير</h2>\n" +
      filteredSteps
        .split("\n")
        .map((line) => {
          if (line.includes("image")) {
            const imageIndex = Number.parseInt(line.trim().charAt(5));
            return line.replace(
              /image([0-2])/,
              `<img src= "${dishImages[imageIndex - 1]}">`
            );
          } else {
            return `<p>${line.trim()}</p>`;
          }
        })
        .join("\n");
    const dishDescription = `${ingredientsHtml}\n${descriptionHtml}`;
    return dishDescription;
  }

  async function onDishEdit() {
    const updatedDish: Dish = {
      ...dish,
    };
    updatedDish.name = name;
    updatedDish.subtitle = subtitle;
    updatedDish.dishImages = dishImages;
    updatedDish.dishDescription = generateDishDescription();
    const dishRef = firestore.doc(store, "dishes", dish.id);
    try {
      await firestore.updateDoc(dishRef, { ...updatedDish });
      setSnackColor("success");
      setSnackEvent(`Dish ${updatedDish.name} updated successfully!`);
    } catch (e: any) {
      setSnackColor("error");
      setSnackEvent(`something went wrong ${e.toString()}`);
    }
    setOpenSnack(true);
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

      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={6000}
      >
        <Alert severity={snackbarColor} variant="filled">
          {snackbarEvent}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
