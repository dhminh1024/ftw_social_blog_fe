import React from "react";
import { Card } from "react-bootstrap";

const BlogCard = () => {
  return (
    <Card>
      <Card.Img variant="top" src="https://via.placeholder.com/160x100" />
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
