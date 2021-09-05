import "./appbar.scss";
import Icon from "@mui/material/Icon";

interface AppbarProps {
  showSidebar: any;
  sidebarActive: boolean;
}

export default function Appbar({ showSidebar, sidebarActive }: AppbarProps) {
  const title = "Wasfat Dashboard";

  return (
    <div className="appbar">
      <div className="icon">
        <Icon onClick={showSidebar}>{sidebarActive ? "close" : "menu"}</Icon>
      </div>
      <div className="title">
        <span>{title}</span>
      </div>
    </div>
  );
}
