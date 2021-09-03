import Image from "react-bootstrap/Image";
import { useAppSelector } from "../../store/hooks";
import "./userinfo.css";

export default function UserInfo() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="userinfo">
      <div>
        <Image
          height={56}
          width={56}
          roundedCircle
          src={user?.imageUrl ?? ""}
        />
      </div>
      <div>
        <span>{user?.name}</span>
        <br />
        <span>{user?.email}</span>
      </div>
    </div>
  );
}
