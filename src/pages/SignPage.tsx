import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button, Snackbar, Alert } from "@mui/material";
import auth from "../firebase/auth";
import "./SignPage.scss";
import { useHistory } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { loggedIn } from "../store/user_slice";
import { useState } from "react";

export default function SignInScreen() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackbarEvent, setSnackEvent] = useState('');
  const signIn = async () => {

    await auth.login((user) => {
      dispatch(loggedIn(user));
      history.replace("/dashboard");
    }, (error) => {

      setSnackEvent(error);
      setOpenSnack(true);
    }
    ).catch((error) => {
      setSnackEvent(error.message);
      setOpenSnack(true);
    });
  };
  return (
    <div className="container ">
      <div className="auth-box">
        <span>Wasfat Dashboard</span>
        <Button
          className="google-button"
          startIcon={<FontAwesomeIcon icon={faGoogle} color="#DB4437" />}
          onClick={signIn}
        >
          Sign In With Google
        </Button>
        <Snackbar
          open={openSnack}
          onClose={() => setOpenSnack(false)}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert variant="filled" severity='error'>
            {snackbarEvent}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
