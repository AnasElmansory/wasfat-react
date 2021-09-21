import "./ImagePicker.scss";
import { Alert, IconButton, Snackbar, AlertColor } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { Image, CloudUpload, Close } from "@mui/icons-material";
import FilePicker, { InputErrorCode } from "@mavedev/react-file-picker";
import { useState } from "react";
import { fireStorage, storage } from "../../firebase/client";

interface ImagePickerProps {
  image?: string;
  index: number;
  dishId: string;
  categoryId: string;
  openSnackbar: () => void;
  setSnackColor: (color: AlertColor) => void;
  setSnackEvent: (event: string) => void;
  updateDishImages: (image: string, index: number, toDelete?: boolean) => void;
}

interface ImagesContainerProps {
  images: string[];
  dishId: string;
  categoryId: string;
  updateDishImages: (image: string, index: number, toDelete?: boolean) => void;
}

export function ImagePicker({
  image,
  index,
  dishId,
  categoryId,
  ...callbacks
}: ImagePickerProps) {
  const [currentImage, setImage] = useState(image);
  const [currentImageFile, setCurrentImageFile] = useState<File>();
  const [isUploading, setUploadingState] = useState<boolean>(false);
  const onFilePicked = async (file: File) => {
    try {
      setCurrentImageFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      document
        .querySelector(`#image-picker-${index}`)
        ?.setAttribute("src", `data:${file.type};base64, ${base64}`);
      setImage(`data:${file.type};base64, ${base64}`);
      callbacks.setSnackColor("success");
      callbacks.setSnackEvent("image is loaded successfully");
      callbacks.openSnackbar();
    } catch (err: any) {
      console.log(err);
    }
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
    callbacks.setSnackColor("error");
    callbacks.setSnackEvent(errorEvent);
    callbacks.openSnackbar();
  };

  const uploadImage = async () => {
    const file = currentImageFile;
    if (!file) {
      callbacks.setSnackColor("error");
      callbacks.setSnackEvent("no image to upload!");
      callbacks.openSnackbar();
    } else {
      setUploadingState(true);
      const path = `${categoryId}/${dishId}/${file.name}`;
      const ref = fireStorage.ref(storage, path);
      const uploadResult = await fireStorage.uploadBytes(
        ref,
        await file.arrayBuffer()
      );
      const downloadUrl = await fireStorage.getDownloadURL(uploadResult.ref);
      callbacks.updateDishImages(downloadUrl, index);
      setUploadingState(false);
    }
  };

  const reset = () => {
    setImage(image);
    setCurrentImageFile(undefined);
    callbacks.updateDishImages("", index, true);
  };

  return (
    <div className="image-picker-container">
      <div className="picker-image">
        <img id={`image-picker-${index}`} src={currentImage || ""} />
      </div>

      <div className="picker-actions">
        <FilePicker
          onFilePicked={(file) => onFilePicked(file)}
          extensions={[".png", ".jpg", ".jpeg", ".tif", ".tiff", ".bmp"]}
          maxSize={5}
          sizeUnit="MB"
          onError={onError}
        >
          <IconButton color="info">
            <Image />
          </IconButton>
        </FilePicker>
        <IconButton
          color="success"
          disabled={!currentImageFile ? true : false}
          onClick={uploadImage}
        >
          <CloudUpload />
        </IconButton>
        {currentImage || currentImageFile ? (
          <IconButton color="error" onClick={reset}>
            <Close />
          </IconButton>
        ) : null}
        {isUploading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div style={{ height: "46px", width: "46px" }}></div>
        )}
      </div>
    </div>
  );
}

export default function ImagePickerContainer({
  images,
  dishId,
  categoryId,
  updateDishImages,
}: ImagesContainerProps) {
  const [openSnackbar, setSnackOpen] = useState(false);
  const [snackbarEvent, setSnackEvent] = useState("");
  const [snackbarColor, setSnackColor] = useState<AlertColor>("success");
  const onSnackClose = () => setSnackOpen(false);

  return (
    <div className="images-picker">
      {[0, 1, 2].map((imageIndex) => (
        <ImagePicker
          key={imageIndex}
          image={images ? images[imageIndex] : undefined}
          index={imageIndex}
          dishId={dishId}
          categoryId={categoryId}
          openSnackbar={() => setSnackOpen(true)}
          setSnackColor={(color) => setSnackColor(color)}
          setSnackEvent={(event) => setSnackEvent(event)}
          updateDishImages={updateDishImages}
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
