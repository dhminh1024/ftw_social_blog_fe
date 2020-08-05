import React from "react";
import { Container, Jumbotron, CardDeck } from "react-bootstrap";
import BlogCard from "../../components/BlogCard";

const HomePage = () => {
  return (
    <Container>
      <Jumbotron className="text-center">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
      </Jumbotron>
      <CardDeck>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </CardDeck>
    </Container>
  );
};

export default HomePage;
