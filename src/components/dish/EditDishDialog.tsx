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
  };
  const formGroup: CSSProperties = {
    width: "40%",
    color: "#114b0b",
  };
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="md">
      <Container className="edit-dish-dialog-container">
        <Form>
          <div style={formRow}>
            <Form.Group style={formGroup}>
              <Form.Label>اسم الطبق</Form.Label>
              <Form.Control as="textarea" defaultValue={name}></Form.Control>
            </Form.Group>
            <Form.Group style={formGroup}>
              <Form.Label>وصف الطبق</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={subtitle}
              ></Form.Control>
            </Form.Group>
          </div>
          <div style={formRow}>
            <Form.Group style={formGroup}>
              <Form.Label>المكونات</Form.Label>
              <Form.Control defaultValue={description}></Form.Control>
            </Form.Group>
            <Form.Group style={formGroup}>
              <Form.Label>طريقة التحضير</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue="طريقة التحضير"
              ></Form.Control>
            </Form.Group>
          </div>
        </Form>
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
