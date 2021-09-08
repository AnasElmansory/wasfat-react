import "./ImagePicker.scss";
import { Alert, IconButton, Snackbar, AlertColor } from "@mui/material";
import { Image, CloudUpload, Cancel } from "@mui/icons-material";
import FilePicker, { InputErrorCode } from "@mavedev/react-file-picker";
import { useState } from "react";

interface ImagePickerProps {
  image?: string;
  openSnackbar: () => void;
  setSnackColor: (color: AlertColor) => void;
  setSnackEvent: (event: string) => void;
}

export function ImagePicker({
  image,
  openSnackbar,
  setSnackEvent,
  setSnackColor,
}: ImagePickerProps) {
  const onFilePicked = (file: File) => {
    setSnackColor("success");
    setSnackEvent("image is loaded successfully");
    openSnackbar();
  };
  const onError = (errorCode: number) => {
    let errorEvent: string;
    if (InputErrorCode.containsExtensionError(errorCode)) {
      errorEvent = "File has inappropriate extension";
    } else if (InputErrorCode.containsMaxSizeError(errorCode)) {
      errorEvent = "File size exceeded max size specified";
    } else {
      errorEvent = "something went wrong!";
    }
    setSnackColor("error");
    setSnackEvent(errorEvent);
    openSnackbar();
  };
  return (
    <div className="image-picker-container">
      <div className="picker-image">
        <img src={image || ""} alt="image" />
      </div>

      <div className="picker-actions">
        <FilePicker
          onFilePicked={onFilePicked}
          extensions={[".png", ".jpg", ".jpeg"]}
          maxSize={5}
          sizeUnit="MB"
          onError={onError}
        >
          <IconButton color="info">
            <Image />
          </IconButton>
        </FilePicker>
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

export default function ImagePickerContainer({ images }: { images: string[] }) {
  const [openSnackbar, setSnackOpen] = useState(false);
  const [snackbarEvent, setSnackEvent] = useState("");
  const [snackbarColor, setSnackColor] = useState<AlertColor>("success");

  const onSnackClose = () => setSnackOpen(false);
  return (
    <div className="edit-dish-images-picker">
      {[0, 1, 2].map((imageIndex) => (
        <ImagePicker
          image={images[imageIndex]}
          openSnackbar={() => setSnackOpen(true)}
          setSnackColor={(color) => setSnackColor(color)}
          setSnackEvent={(event) => setSnackEvent(event)}
        />
      ))}

      <Snackbar
        open={openSnackbar}
        onClose={onSnackClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbarColor} variant="filled">
          {snackbarEvent}
        </Alert>
      </Snackbar>
    </div>
  );
}
