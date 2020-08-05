import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, ...rest }) => {
  if (isAuthenticated) return <Route {...rest} />;
  delete rest.component;
  return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
};

export default PrivateRoute;
