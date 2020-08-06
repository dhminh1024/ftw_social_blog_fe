import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "../DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../layouts/PublicLayout";
import AddEditBlogPage from "../AddEditBlogPage";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
      <PrivateRoute exact path="/blog/edit/:id" component={AddEditBlogPage} />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};

export default Routes;
