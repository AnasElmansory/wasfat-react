import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./DashDialog.scss";

interface DashDialogProps {
  openDialog: boolean;
  onCloseDialog: () => void;
  categoryPriority: number;
  categoryName: string;
  onEdit: (value: number) => void;
}

export default function DashDialog({
  openDialog,
  onCloseDialog,
  onEdit,
  categoryPriority,
  categoryName,
}: DashDialogProps) {
  const [input, setInput] = useState(categoryPriority);
  return (
    <Modal
      show={openDialog}
      onHide={onCloseDialog}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="title">
          Edit Category {categoryName} Priorty
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Enter New Priority</h4>
        <TextField
          value={input}
          onChange={(event) => {
            setInput(Number.parseInt(event.target.value));
          }}
          autoFocus
          margin="dense"
          label="Category priority"
          type="number"
          fullWidth
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="category-priorty-btn close" onClick={onCloseDialog}>
          Close
        </Button>
        <Button
          className="category-priorty-btn edit"
          onClick={() => onEdit(input)}
        >
          Edit Priority
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
