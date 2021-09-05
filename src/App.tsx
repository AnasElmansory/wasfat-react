import React from "react";
import "./App.css";
import Layout from "./layouts/layout";
import SignInScreen from "./pages/SignPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import CategoryPage from "./pages/categories/CategoryPage";
import routes from "./utils/routes";
import Dashboard from "./pages/dashboard/Dashboard";

export interface AppProps {}

export interface AppState {}

interface RouteProps {
  path: string;
  page: JSX.Element;
  name: string;
}

class App extends React.Component<AppProps, AppState> {
  state = {};
  routes: RouteProps[] = [
    { path: "/categories", name: "Dashboard", page: <div>somethigns</div> },
    { path: "/dishes", name: "Dishes", page: <div>dishes</div> },
    { path: "/add-dish", name: "Add Dish", page: <div>add-dish</div> },
  ];
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <LoadingPage />
          </Route>

          <Route path="/sign">
            <SignInScreen />
          </Route>

          <Route path="/dashboard">
            <Layout>
              <Switch>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                {routes.map((route) => {
                  return (
                    <Route path={route.path} key={route.name}>
                      <Switch>
                        <Route exact path={route.path}>
                          {route.component}
                        </Route>
                        {route.children?.map((childRoute) => {
                          return (
                            <Route path={childRoute.path} key={childRoute.name}>
                              {childRoute.component}
                            </Route>
                          );
                        })}
                      </Switch>
                    </Route>
                  );
                })}
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
