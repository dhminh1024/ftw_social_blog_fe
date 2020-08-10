import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "../DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../layouts/PublicLayout";

const Routes = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};
export default Routes;
