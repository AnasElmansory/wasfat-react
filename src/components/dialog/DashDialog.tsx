import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./DashDialog.scss";

interface DashDialogProps {
  openDialog: boolean;
  categoryName: string;
  categoryPriority: number;
  onEdit: (value: number) => void;
  onCloseDialog: () => void;
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
          autoFocus
          fullWidth
          type="number"
          margin="dense"
          variant="filled"
          label="Category priority"
          onChange={(event) =>
            setInput(
              Number.parseInt(
                event.target.value == "" ? "0" : event.target.value
              )
            )
          }
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
