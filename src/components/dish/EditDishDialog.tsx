import { Dish } from "../../firebase/store/types";
import {
  Dialog,
  TextField,
  Button,
  Stack,
  Container,
  FilledInput,
} from "@mui/material";
import { Form } from "react-bootstrap";
import "./EditDishDialog.scss";
import ImagePicker from "./ImagePicker";
import { useState, CSSProperties } from "react";

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
  const [name, setName] = useState(dish.name);
  const [subtitle, setSubtitle] = useState(dish.subtitle);
  const [description, setDescription] = useState(dish.dishDescription);
  const [dishImages, setDishImages] = useState(dish.dishImages);
  const formRow: CSSProperties = {
    display: "flex",
    justifyContent: "space-evenly",
    flexFlow: "wrap",
    marginBlock: "8px",
  };
  const formField: CSSProperties = {
    width: "40%",
    color: "#114b0b",
  };
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="md">
      <Container className="edit-dish-dialog-container">
        <form>
          <div style={formRow}>
            <input type="text" name="اسم الطبق" id="dish-name" className="edit-dish-field" />
            <input type="text" name="اسم الطبق" id="dish-name" className="edit-dish-field" />
          </div>
          <div style={formRow}>
            <input type="text" name="اسم الطبق" id="dish-name" className="edit-dish-field" />
            <input type="text" name="اسم الطبق" id="dish-name" className="edit-dish-field" />
          </div>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            marginBlock: "16px",
          }}
        >
          <ImagePicker image={dishImages[0]}></ImagePicker>
          <ImagePicker image={dishImages[1]}></ImagePicker>
          <ImagePicker image={dishImages[2]}></ImagePicker>
        </div>

        <div className="edit-dish-dialog-action-btn">
          <Button color="info" onClick={edit}>
            Edit
          </Button>
          <Button color="warning" onClick={close}>
            Close
          </Button>
        </div>
      </Container>
    </Dialog>
  );
}
