import "./appbar.scss";
import { IconButton } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";

interface AppbarProps {
  showSidebar: any;
  sidebarActive: boolean;
}

export default function Appbar({ showSidebar, sidebarActive }: AppbarProps) {
  const title = "Wasfat Dashboard";

  return (
    <div className="appbar">
      <div className="icon">
        <IconButton onClick={showSidebar} id='app-bar-drawer'>
          {sidebarActive ? <Close /> : <Menu />}
        </IconButton>
      </div>
      <div className="title">
        <span>{title}</span>
      </div>
    </div>
  );
}
