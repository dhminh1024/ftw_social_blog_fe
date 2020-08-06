import React from "react";
import PublicNavbar from "../PublicNavbar";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import NotFoundPage from "./NotFoundPage";
import AlertMsg from "./Alert";
import BlogDetailPage from "../BlogDetailPage";
import PrivateRoute from "../Routes/PrivateRoute";
import AddEditBlogPage from "../AddEditBlogPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
