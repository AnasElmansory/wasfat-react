import Sidebar from "../components/sidebar/sidebar";
import Appbar from "../components/appbar/appbar";
import isAdmin from "../firebase/helper";
import { useState, useEffect } from "react";
import { auth, firebaseAuth } from "../firebase/client";
import { loggedIn, loggedOut } from "../store/user_slice";
import { useHistory } from "react-router";
import { useAppDispatch } from "../store/hooks";
import "./layout.scss";

export default function Layout(props: any) {
  const [sidebarVisible, setSidebarState] = useState(false);
  const showSidebar = () => {
    setSidebarState(!sidebarVisible);
  };

  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscripe = firebaseAuth.onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(loggedOut());
        history.replace("/sign");
      } else {
        const result = await isAdmin(user.email!);
        let _user = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          imageUrl: user.photoURL,
          permission: result ? "editor" : "user",
        };
        if (result) {
          dispatch(loggedIn(_user));
          history.replace("/dashboard/categories");
        }
      }
    });
    return () => {
      unsubscripe();
    };
  }, [history, dispatch]);
  return (
    <div className="layout">
      <Appbar showSidebar={showSidebar} sidebarActive={sidebarVisible}></Appbar>
      <div className="dashboard">
        <Sidebar show={sidebarVisible} />
        <div className="main">{props.children}</div>
      </div>
    </div>
  );
}
