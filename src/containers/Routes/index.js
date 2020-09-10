import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

const Routes = (props) => {
  return (
    <Switch>
      <PrivateRoute path="/admin" component={AdminLayout} />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};
export default Routes;
