import "./sidebar.scss";
import UserInfo from "../user_info/Userinfo";
import { Link, useHistory } from "react-router-dom";
import auth from "../../firebase/auth";
import { loggedOut } from "../../store/user_slice";
import { useAppDispatch } from "../../store/hooks";
import routes from "../../utils/routes";

export default function Sidebar({ show }: { show: boolean }) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onLogout = async () => {
    await auth.logout(() => {
      dispatch(loggedOut());
      history.replace("/sign");
    });
  };

  return (
    <aside className={show ? "sidebar active" : "sidebar"}>
      <UserInfo></UserInfo>
      {routes.map((route) => (
        <Link className="link" to={route.path} key={route.name}>
          {route.name}
        </Link>
      ))}
      <div className="logout-button-container">
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
