import React from "react";
import PublicNavbar from "../PublicNavbar";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import AlertMsg from "./AlertMsg";
import ProfilePage from "../Admin/ProfilePage";
import SideMenu from "../Admin/SideMenu";
import FriendListPage from "../Admin/FriendListPage";
import AddEditBlogPage from "../AddEditBlogPage";
import BlogListPage from "../Admin/BlogListPage";
import BlogDetailPage from "../BlogDetailPage";
import MessengerPage from "../Admin/MessengerPage";

const AdminLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid>
        <Row>
          <SideMenu />
          <Col md={9} lg={10}>
            <AlertMsg />
            <Switch>
              <Route exact path="/admin/profile" component={ProfilePage} />
              <Route exact path="/admin/friends" component={FriendListPage} />
              <Route exact path="/admin/blogs" component={BlogListPage} />
              <Route exact path="/admin/blogs/:id" component={BlogDetailPage} />
              <Route exact path="/admin/blog/add" component={AddEditBlogPage} />
              <Route
                exact
                path="/admin/blog/edit/:id"
                component={AddEditBlogPage}
              />
              <Route exact path="/admin/messenger" component={MessengerPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
