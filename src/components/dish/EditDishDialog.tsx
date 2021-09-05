import { Dish } from "../../firebase/store/types";
import { Dialog, TextField, Button, Stack } from "@mui/material";
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
    <Dialog open={open} onClose={close} fullWidth maxWidth='md'>
      <Stack spacing={4} className="dish-field-container">

        <TextField className='field' id="dish-name" label="اسم الطبق" margin="dense" />
        <TextField className='field' id="dish-subtitle" label="وصف الطبق" />
        <TextField className='field'
          id="dish-ingredients"
          label="المكونات"
          prefix="المكونات"
        /
        >
        <TextField
          className='field'
          id="dish-description"
          label="طريقة التحضير"
          prefix="طريقه التحضير" /
        >
        <Stack
          className="edit-dish-dialog-action-btn"
          direction="row"
          spacing={8}
          justifyContent="center">
          <Button color="info" onClick={edit}>
            Edit
        </Button>
          <Button color='warning' onClick={close}>Close</Button>
        </Stack>

      </Stack>
    </Dialog>
  );
}
