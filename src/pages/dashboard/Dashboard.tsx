import "./Dashboard.scss";
import routes from "../../utils/routes";
import { Card, CardContent } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  return (
    <div className="dash-page">
      <h1>welcome to Wasfat Dashboard</h1>
      <div className="dash-items">
        {routes.map((route) => {
          return (
            <div className="dash-item" key={route.name}>
              <Card
                raised
                key={route.name}
                sx={{ backgroundColor: "#fa990e", color: "#114b0b" }}
                onClick={() => {
                  history.push(route.path);
                }}
              >
                <CardContent>{route.name}</CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
