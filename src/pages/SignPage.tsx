import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@material-ui/core";
import auth from "../firebase/auth";
import "./SignPage.scss";
import { useHistory } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { loggedIn } from "../store/user_slice";

export default function SignInScreen() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const signIn = async () => {
    await auth.login((user) => {
      dispatch(loggedIn(user));
      history.replace("/dashboard");
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
      </div>
    </div>
  );
}
