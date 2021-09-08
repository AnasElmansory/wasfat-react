import { Dish } from "../../firebase/store/types";
import { Dialog, TextField, Button, InputLabelProps } from "@mui/material";

import "./EditDishDialog.scss";
import ImagePickerContainer from "./ImagePicker";
import { useState } from "react";

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

  const [name, setName] = useState(dish.name);
  const [subtitle, setSubtitle] = useState(dish.subtitle);
  const [ingredients, setIngredients] = useState(
    getIngredients(dish.dishDescription)
  );
  const [dishImages, setDishImages] = useState(dish.dishImages);
  const [description, setDescription] = useState(
    getDescription(dish.dishDescription)
  );

  function formatDescription(description: string): string | null {
    const stepsExp = /((<h2>)(الخطوات|طريقه التحضير|طريقة التحضير)(<\/h2>))/g;
    const result = description.match(stepsExp);
    return result != null ? result[0] : null;
  }

  function extractText(html: string): string {
    return html
      .replaceAll(/(<h2>)|(<p>)|(" ")/g, "")
      .replaceAll(/(<\/h2>)|(<\/p>)|(" ")/g, "")
      .trim();
  }

  function extractImages(text: string) {
    const imgExp = /(<img\s*src\s*=\s*)(https)([a-zA-Z0-9@:\/.\-%_?=&>])*/g;
    const result = text.match(imgExp);
    if (result != null) {
      for (const image of result) {
        text = text.replace(image, `image${result.indexOf(image + 1)}`);
      }
      return text;
    } else {
      return text;
    }
  }

  function getIngredients(description: string): string {
    const formatedDescription = formatDescription(description);
    if (formatedDescription != null) {
      const endIndex = description.indexOf(formatedDescription);
      const ingredientsHtml = description.substring(0, endIndex);
      const ingredientsString = extractText(ingredientsHtml);
      return ingredientsString;
    } else {
      return "Ingredients Format Error";
    }
  }

  function getDescription(description: string): string {
    const formatedDescription = formatDescription(description);
    if (formatedDescription != null) {
      const startIndex = description.indexOf(formatedDescription);
      const descriptionHtml = description.substring(startIndex);
      const descriptionString = extractText(descriptionHtml);
      const finalDescriptionString = extractImages(descriptionString);
      return finalDescriptionString;
    } else {
      return "Description Format Error";
    }
  }

  function generateDishDescription():string{
   const filteredIngredients = ingredients.replace(/(المكونات|المقادير|المكوّنات)/,"").trim();
   const filteredSteps = description.replace(/(طريقه التحضير|طريقة التحضير|الخطوات)/,"").trim();
   // to html ingredients
   const ingredientsHeading = '<h2>المكونات</h2>\n';
   const stepsHeading = "<h2>طريقة التحضير</h2>\n";

   const ingredientsHtmlItems =  filteredIngredients.split('\n').map(line=>
     `<p>${line.trim()}</p>`).join('\n');
     const ingredientsHtml = `${ingredientsHeading}${ingredientsHtmlItems}`;
    
   //to html steps
   // from image list to img tag in steps html
  }

  function onDishEdit(){

  }


  function updateDishImages(image: string, index: number) {
    const newDishImages = dishImages.map((img, imgIndex) => {
      if (imgIndex === index) {
        return image;
      } else {
        return img
      }
    })
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
          <Button color="info" onClick={edit}>
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
