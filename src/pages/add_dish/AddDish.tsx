import "./AddDish.scss";
import {
  TextField,
  InputLabelProps,
  Theme,

} from "@mui/material";
import { SxProps } from "@mui/system";
import ImagePickerContainer from "../../components/dish/ImagePicker";
import { useState } from "react";
import AddCategory from '../../components/dish/AddCategory'
interface Category {
  id: string;
  name: string;
}

export default function AddDish() {
  const [categories, setCategories] = useState<Category[]>();

  const inputProps: InputLabelProps = {
    color: "warning",
    sx: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "right",
      direction: "rtl",
    },
  };
  const textFieldStyle: SxProps<Theme> = {
    width: "40%",
    direction: "rtl",
    marginBlock: "8px",
    textAlign: "right",
  };
  return (
    <div className="add-dish-container">
      <div className="add-dish-details">
        <div className="add-dish-details-section">
          <TextField
            dir="right"
            label="اسم الطبق"
            sx={textFieldStyle}
            InputLabelProps={inputProps}
            color="warning"
            variant="filled"
            fullWidth
          />

          <TextField
            label="وصف الطبق"
            sx={textFieldStyle}
            InputLabelProps={inputProps}
            color="warning"
            variant="filled"
            fullWidth
            multiline
          />
        </div>
        <div className="add-dish-details-section">
          <TextField
            label="المكونات"
            sx={textFieldStyle}
            InputLabelProps={inputProps}
            color="warning"
            variant="filled"
            fullWidth
            multiline
          />
          <TextField
            label="طريقة التحضير"
            sx={textFieldStyle}
            InputLabelProps={inputProps}
            color="warning"
            variant="filled"
            fullWidth
            multiline
          />
        </div>
      </div>

      <div className="add-image-picker-container">
        <ImagePickerContainer />
      </div>
      <AddCategory />
    </div>
  );
}
