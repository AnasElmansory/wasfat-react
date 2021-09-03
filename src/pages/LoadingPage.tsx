import { Spinner } from "react-bootstrap";
import { auth, firebaseAuth } from "../firebase/client";
import isAdmin from "../firebase/helper";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { loggedIn, loggedOut } from "../store/user_slice";

export default function LoadingPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscripeFromAuthChange = firebaseAuth.onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          history.replace("/sign");
          dispatch(loggedOut());
        } else {
          const result = await isAdmin(user.email!);
          let _user = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            imageUrl: user.photoURL,
            permission: result ? "editor" : "user",
          };
          dispatch(loggedIn(_user));
          if (result === true) {
            history.replace("/dashboard");
          } else {
            history.replace("/sign");
          }
        }
      }
    );
    return () => {
      unsubscripeFromAuthChange();
    };
  }, [history, dispatch]);

  return (
    <div className="container">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
