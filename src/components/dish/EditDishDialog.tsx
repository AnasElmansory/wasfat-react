import { Dish } from "../../firebase/store/types";
import { Dialog, TextField } from "@mui/material";
import "./EditDishDialog.scss";

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
  return (
    <Dialog open={open} onClose={close}>
      <TextField id="dish-name" label="Dish Name"></TextField>
      <TextField id="dish-subtitle" label="Dish Subtitle"></TextField>
      <TextField
        id="dish-ingredients"
        label="Ingredients"
        helperText="المكونات"
      ></TextField>
      <TextField
        id="dish-description"
        label="Description"
        helperText="طريقه التحضير"
      ></TextField>
    </Dialog>
  );
}
