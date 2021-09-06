import "./ImagePicker.scss";
import { Container, Stack, IconButton } from "@mui/material";
import { Image, CloudUpload, Cancel } from "@mui/icons-material";

export default function ImagePicker({ image }: { image?: string }) {
  return (
    <div className="image-picker-container">
      <div className="picker-image">
        <img src={image || ""} alt="image" />
      </div>

      <div className="picker-actions">
        <IconButton color="info">
          <Image />
        </IconButton>
        <IconButton color="success">
          <CloudUpload />
        </IconButton>
        <IconButton color="error">
          <Cancel />
        </IconButton>
      </div>
    </div>
  );
}
