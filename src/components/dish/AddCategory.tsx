import { Add, Cancel } from "@mui/icons-material";
import { Button, Chip, Dialog } from "@mui/material";
import { useState } from "react";
import "./AddCategory.scss";
import { Spinner } from "react-bootstrap";
import { Category } from "../../firebase/store/types";

export default function AddCategory({
  loading,
  categories,
  onCategoryToggle,
}: {
  loading: boolean;
  categories: Category[];
  onCategoryToggle: (category: Category) => void;
}) {
  const [showDialog, setDialogOpen] = useState<boolean>(false);

  return (
    <div className="add-category-picker-container">
      <Button id="add-category-btn" onClick={() => setDialogOpen(true)}>
        <Add />
        Add Category
      </Button>
      <div className="add-selected-categories">
        {categories
          .filter((_category) => _category.isSelected)
          .map((category) => (
            <Chip
              key={category.id}
              size="medium"
              className="category-chips"
              label={category.name}
            />
          ))}
      </div>
      <Dialog open={showDialog} onClose={() => setDialogOpen(false)} fullWidth>
        <div className="add-categories-list-container">
          <h2>Select Category</h2>
          {loading ? <Spinner variant="primary" animation="border" /> : null}
          <ul className="add-category-list">
            {categories.map((category) => {
              return (
                <li
                  id={category.id}
                  key={category.id}
                  className={`add-category-item ${
                    category.isSelected ? "selected" : ""
                  }`}
                  onClick={() => onCategoryToggle(category)}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          id="select-category-cancel-btn"
          color="error"
          onClick={() => setDialogOpen(false)}
        >
          <Cancel />
          Close
        </Button>
      </Dialog>
    </div>
  );
}
